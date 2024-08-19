<template>
    <div>
      <header>
        <nav class ="ul-items">
          <ul>
            <li><NuxtLink to="/">Home</NuxtLink></li>
            <li><NuxtLink to="/auth/login">Login</NuxtLink></li>
            <li><NuxtLink to="/auth/register">Register</NuxtLink></li>
          </ul>
          <a href="/">Home</a>
        </nav>
      </header>
    </div>
    <div>
      <slot />
    </div>
  </template>
  <style>
    .ul-items{
      position: flex;
      margin: auto;
      justify-content: center;
      align-items: center;
      border: 1px solid green;
    }
  </style>
  