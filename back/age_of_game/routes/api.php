<?php
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::get('/', function () {
    $routes = Route::getRoutes();

    $groupedRoutes = [];

    foreach ($routes as $route) {
        $methods = $route->methods();
        $uri = $route->uri();
        
        foreach ($methods as $method) {
            $groupedRoutes[$method][] = $method . ': ' . $uri;
        }
    }

    return response()->json(['routes' => $groupedRoutes]);
});


Route::post('/login',[UserController::class, 'login']);


Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
});
