<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UsageLog extends Model
{
    use HasFactory;

    protected $table = 'UsageLogs';
    protected $primaryKey = 'Id';

    const CREATED_AT = 'CreatedAt';
    const UPDATED_AT = null;

    protected $fillable = [
        'Username',
        'FileName',
        'TotalPages',
        'BWPages',
        'ColorPages',
        'EstimatedCost',
    ];
}
