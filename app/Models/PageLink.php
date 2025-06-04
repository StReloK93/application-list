<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PageLink extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $fillable = [
        'link',
        'description'
    ];
}
