<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class App extends Model
{
    use HasFactory;



    protected $fillable = [
        'name',
        'icon',
        'description',
        'category_id',
        'link',
    ];


    public function tasks()
    {
        return $this->hasMany(AppTask::class);
    }

}
