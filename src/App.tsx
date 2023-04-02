import React from "react";
import { Route, Routes } from "react-router-dom";

import HomeLayout from "layouts/Home.layout";
import NotFoundPage from "pages/NotFound.page";
const PostsPage = React.lazy(() => import("pages/Posts.page"));

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomeLayout />}>
        <Route
          index
          element={
            <React.Suspense fallback={<>Loading...</>}>
              <PostsPage />
            </React.Suspense>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
