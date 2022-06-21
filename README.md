---
title: Notes CRUD
toc: false
order: 1
---

# Outline

- Start with the HTML all there in main.jsx with some hard-coded data
- Bring in browser router
- Move hard coded data to the loader
- make the create button work
- load the real data
- make the contact show page
  - not as a child route
  - make it a child route
  - add the index route
  - implement delete
- implement edit page
- slow everything down
  - implement opacity pending state
- implement search
  - spinner on search input
  - semi-control input component
  - add first contact fun
    - navigate on submit
  - replace history entry on submit/link clicks
- implement favorite with normal form
  - favorite w/ fetcher
  - implement optimistic UI

# Data Routers

This example demonstrates some of the basic features of Data Router, including:

- Loader functions
- Action functions
- <Link> and <Form> navigations

## Preview

Open this example on [StackBlitz](https://stackblitz.com):

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/remix-run/react-router/tree/remixing/examples/notes?file=src/main.tsx)
