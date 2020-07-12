@extends('layouts.default')

@section('page_title', 'Dashboard')

@section('content')
    <div id="app"></div>
@endsection

@section('scripts_before_body')
    <script src="{{ mix('js/app.js') }}"></script>
@endsection
