<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('/app/{param1?}/{param2?}/{param3?}', 'AppController@root');

Route::group(['middleware' => ['api'], 'prefix' => 'api'], function () {
    Route::group(['prefix' => 'v1.0.0'], function () {
        Route::group(['namespace' => 'Auth', 'prefix' => 'auth'], function () {
            Route::post('login', 'LoginController@authenticate');
            Route::get('hello', 'LoginController@hello');
            Route::post('signup', 'RegisterController@register');
            Route::get('verification/{token}', 'RegisterController@verification');
            Route::get('signout', 'LoginController@signout')->middleware('jwt.refresh');
        });
        Route::group(['middleware' => ['jwt.auth']], function() {
            Route::resource('articles', 'ArticleController');

            Route::get('profiles/me', 'UserController@profile');
            Route::post('profiles/update-my-avator', 'UserController@updateMyAvator');
            Route::post('profiles/update-me', 'UserController@updateMe');
            Route::post('profiles/update-my-password', 'UserController@updateMyPassword');

            Route::get('channels', 'ChannelController@index');

            Route::get('team-members', 'TeamMemberController@index');

            Route::group(['middleware' => ['checkAdmin']], function() {
                Route::put('team-members/{team_member_id}/verify', 'TeamMemberController@verify');
                Route::put('team-members/{team_member_id}/lock', 'TeamMemberController@lock');
                Route::put('team-members/{team_member_id}/unlock', 'TeamMemberController@unlock');
            });
        });
    });
});

Route::group(['middleware' => ['jwt.auth']], function() {
    Route::get('private-img/{user_id}/avator/{filename}', 'ImageController@privateImage');
});
