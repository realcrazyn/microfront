import { createRoot } from 'react-dom/client';
import { App } from './components/App/App';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import { AboutPage } from '@/pages/about';
import { ShopPage } from '@/pages/shop';
import { Suspense } from 'react';

const root = document.getElementById('root')

if (!root) {
    throw new Error('root not found')
}

const container = createRoot(root);


const routes = createRoutesFromElements(
    <>
        <Route index Component={App} />

    </>
);

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '/about',
                element: <Suspense fallback={<div>Loading...</div>}><AboutPage /></Suspense>
            },
            {
                path: '/shop',
                element: <Suspense fallback={<div>Loading...</div>}><ShopPage /></Suspense>
            }
        ]
    }
]);

container.render(
    <RouterProvider router={router} />
);