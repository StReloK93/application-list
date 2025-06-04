<?php

namespace App\Http\Controllers;

use App\Models\PageLink;
use Illuminate\Http\Request;

class PageLinkController extends Controller
{
    public function index()
    {
        return PageLink::all();
    }


    public function show($id)
    {
        return PageLink::find($id);
    }
    public function store(Request $request)
    {
        return PageLink::create($request->all());
    }

    public function update($id, Request $request)
    {
        $pageLink = PageLink::find($id);
        $pageLink->link = $request->link;
        $pageLink->description = $request->description;
        $pageLink->save();

        return $pageLink;

    }

    public function destroy($id)
    {
        return PageLink::find($id)->delete();
    }

}
