import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";

import Home from "../components/pages/Home";
import Channel from "../components/pages/Channel";
import PlayList from "../components/pages/PlayList";
import ChannelDetail from "../components/pages/ChannelDetail";
import PlaylistDetail from "../components/pages/PlayListDetail";
import Video from "../components/pages/Video";
import SearchResult from "../components/pages/SearchResult";
import NotFound from "../components/pages/NotFound";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

const history = createBrowserHistory();
const AppRouter = () => {
  return (
    <div className="d-flex flex-column" style={{ height: "100vh" }}>
      <div className="flex-grow-1 mb-4">
        <Router history={history}>
          <Header />
          <div className="container-fluid">
            <div className="row justify-content-center">
              <div className="col-md-10">
                <Switch>
                  <Route path="/video/:id" component={Video} />
                  <Route path="/channel/:id" component={ChannelDetail} />
                  <Route path="/playlist/:id" component={PlaylistDetail} />
                  <Route path="/channel" exact component={Channel} />
                  <Route path="/playlist" component={PlayList} />
                  <Route path="/results" component={SearchResult} />
                  <Route path="/" exact component={Home} />
                  <Route path="*" component={NotFound} />
                </Switch>
              </div>
            </div>
          </div>
        </Router>
      </div>
      <Footer />
    </div>
  );
};
export default AppRouter;
