<?php


namespace App\Traits;

use Illuminate\Http\Response;

trait ApiResponser
{

    // Error Response
    public function errorResponse( $message, $code )
    {
        return response()->json([ 'error' => $message, 'code' => $code ], $code);
    }

    // success response
    public function successResponse( $data, $data_attributes = [], $code = Response::HTTP_OK )
    {
        if( !empty($data_attributes)){
            return response()->json([ 'data' => $data, 'attributes' => $data_attributes ],  $code);
        }
        return response()->json([ 'data' => $data , 'code' => $code ], $code);
    }

    // Resource created
    public function createdResponse($data, $code = Response::HTTP_CREATED){
        return response()->json([ 'data' => $data, 'code' => $code ], $code);
    }

    // No content response
    public function emptyResponse(){
        $code = Response::HTTP_NO_CONTENT;
        return response()->json([ 'error' => 'No matching content found.', 'code' => $code ], $code);
    }

    // record already exists response
    public function conflictResponse(){
        $code = Response::HTTP_CONFLICT;
        return response()->json([ 'error' => 'The record already exists', 'code' => $code ], $code);
    }

}
