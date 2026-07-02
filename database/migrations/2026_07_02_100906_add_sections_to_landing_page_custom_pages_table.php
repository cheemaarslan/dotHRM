<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('landing_page_custom_pages', function (Blueprint $table) {
            // Store an ordered array of landing-page component keys (e.g. ['hero', 'features', 'faq'])
            $table->json('sections')->nullable()->after('content');
            // Allow content to be empty when the page is built from sections only
            $table->longText('content')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('landing_page_custom_pages', function (Blueprint $table) {
            $table->dropColumn('sections');
            $table->longText('content')->nullable(false)->change();
        });
    }
};
