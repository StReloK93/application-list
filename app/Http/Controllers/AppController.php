<?php

namespace App\Http\Controllers;

use App\Models\App;
use App\Models\AppTask;
use Illuminate\Http\Request;
use File;
class AppController extends Controller
{
    public function index()
    {
        return App::with(['tasks'])->get();
    }

    public function store(Request $request)
    {
        $request->validate([
            'icon' => 'required|image|mimes:svg|max:2048',
            'name' => 'required',
            'link' => 'required',
            'category_id' => 'required',
        ]);

        $app = App::create([
            'name' => $request->name,
            'icon' => 'test',
            'description' => $request->description,
            'link' => $request->link,
            'category_id' => $request->category_id,
        ]);

        $app->icon = $this->createImage($app->id, $request->file('icon'));
        $app->save();

        $tasks = json_decode($request->tasks);
        foreach ($tasks as $key => $value) {
            AppTask::create([
                'description' => $value->description,
                'app_id' => $app->id,
            ]);
        }
        $app->tasks;


        return $app;
    }


    public function show(App $app)
    {
        $app->tasks;
        return $app;
    }

    public function update(Request $request, App $app)
    {
        $app->name = $request->name;
        $app->description = $request->description;
        $app->link = $request->link;
        $app->category_id = $request->category_id;

        if ($request->icon) {
            $this->clearImgFile($app->icon);
            $app->icon = $this->createImage($app->id, $request->icon);
        }

        $app->save();


        $tasks = json_decode($request->tasks);
        $tasksWithoutId = array_filter($tasks, fn($object) => !isset ($object->id));
        $tasksWithId = array_filter($tasks, fn($object) => isset ($object->id));

        $idsArray = array_map(fn($object) => $object->id, $tasksWithId);
        AppTask::whereNotIn('id', $idsArray)->where('app_id', $app->id)->delete();

        foreach ($tasksWithId as $task) {
            $AppTask = AppTask::find($task->id);
            $AppTask->description = $task->description;
            $AppTask->save();
        }

        foreach ($tasksWithoutId as $key => $value) {
            AppTask::create([
                'description' => $value->description,
                'app_id' => $app->id,
            ]);
        }

        $app->tasks;
        return $app;

    }


    public function createImage($appId, $file)
    {
        $icon = $appId . time() . '.svg';
        $file->move(public_path('icons'), $icon);

        return $icon;
    }

    public function clearImgFile($imageName)
    {
        if (File::exists(public_path('/icons/' . $imageName))) {
            File::delete(public_path('/icons/' . $imageName));
        }
    }

    public function destroy(App $app)
    {
        AppTask::where('app_id', $app->id)->delete();
        $app->delete();
    }
}
