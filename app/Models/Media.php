<?php

namespace App\Models;

use Spatie\MediaLibrary\MediaCollections\Models\Media as SpatieMedia;
use App\Traits\AutoApplyPermissionCheck;

class Media extends SpatieMedia
{
    use AutoApplyPermissionCheck;
    public function scopeWithPermissionCheck($query)
    {
        $tableName = $this->getTable();
        return $this->applyPermissionScope($query, $tableName);
    }
}
