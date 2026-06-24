<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $table = 'Users';
    protected $primaryKey = 'Id';
    
    public $timestamps = false; // We will handle CreatedAt manually if needed, or define CREATED_AT.

    const CREATED_AT = 'CreatedAt';
    const UPDATED_AT = null; // No UpdatedAt column in the original table

    protected $fillable = [
        'Username',
        'PasswordHash',
        'Role',
    ];

    protected $hidden = [
        'PasswordHash',
    ];

    /**
     * Override the method used to get the password for authentication.
     */
    public function getAuthPassword()
    {
        return $this->PasswordHash;
    }
}
