<?php

namespace App\Http\Middleware;

use App\Models\Plan;
use App\Models\User;
use Closure;
use Illuminate\Http\Request;

class CheckPlanAccess
{
    public function handle(Request $request, Closure $next)
    {
        $user = auth()->user();

        if (! $user) {
            return $next($request);
        }
        // Super admin has full access
        if ($user->isSuperAdmin()) {
            return $next($request);
        }

        // Only company users need plan checks
        if ($user->type !== 'company') {
            $company = User::find($user->created_by);
            if ($company && $company->type === 'company' && $company->isPlanExpired()) {
                auth()->logout();

                return redirect()->route('login')->with('error', __('Access denied. Only company users can access this area.'));
            }
        }

        // Check if user needs plan subscription
        if ($user->needsPlanSubscription()) {
            $message = __('Please subscribe to a plan to continue.');
            if ($user->isTrialExpired()) {
                $message = __('Your trial period has expired. Please subscribe to a plan to continue.');

                $getDefaultPlan = Plan::getDefaultPlan();

                if ($getDefaultPlan) {
                    $planExpireDate = match ($getDefaultPlan->duration) {
                        'yearly' => now()->addYear(),
                        'monthly' => now()->addMonth(),
                        default => now(),
                    };
                    // Assign default plan to user
                    $user->update([
                        'plan_id' => $getDefaultPlan->id,
                        'plan_expire_date' => $planExpireDate,
                        'plan_is_active' => 1,
                        'is_trial' => 0,
                        'trial_expire_date' => null,
                        'trial_day' => 0,
                    ]);

                    $data = [
                        'user_id' => $user->id,
                        'plan_id' => $getDefaultPlan->id,
                        'billing_cycle' => $getDefaultPlan->duration,
                        'payment_method' => 'manual',
                        'coupon_code' => null,
                        'payment_id' => null,
                        'status' => 'approved',
                        'processed_at' => now(),
                    ];

                    createPlanOrder($data);
                } else {
                    $user->update([
                        'plan_id' => null,
                        'plan_expire_date' => null,
                        'plan_is_active' => 0,
                        'is_trial' => 0,
                        'trial_expire_date' => null,
                        'trial_day' => 0,
                    ]);
                }

            } elseif ($user->isPlanExpired()) {
                $message = __('Your plan has expired. Please renew your subscription.');
                // Reset expired plan
                $user->update([
                    'plan_id' => null,
                    'plan_expire_date' => null,
                    'plan_is_active' => 0,
                ]);
            }

            return redirect()->route('plans.index')->with('error', $message);
        }

        return $next($request);
    }
}
