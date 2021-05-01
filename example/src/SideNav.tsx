import React from "react";
import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Switch,
  Typography,
} from "@material-ui/core";
import "./root.scss";
import { Link, useLocation } from "react-router-dom";
import SimpleList from "./pages/SimpleList";
import SimpleGrid from "./pages/SimpleGrid";
import VariableRowHeight from "./pages/VariableRowHeight";
import VariableColumn from "./pages/VariableColumn";
import FullWindow from "./pages/FullWindow";
import VariableRowHeightColumn from "./pages/VariableRowHeightColumn";
import CustomWindow from "./pages/CustomWindow";
import ResponsiveContainerPage from "./pages/ResponsiveContainerDemo";
import ResponsiveWindowContainerDemoPage from "./pages/ResponsiveWindowContainerDemo";
import LazyLoadingAdvanced from "./pages/LazyLoadingAdvanced";
import LazyLoadingSimple from "./pages/LazyLoadingSimple";
import DynamicLoading from "./pages/DynamicLoading";
import ScrollIndicator from "./pages/ScrollIndicator";
import ScrollTo from "./pages/ScrollTo";
import Performance from "./pages/Performance";
import Stats from "stats.js";
import ScrollRestoration from "./pages/ScrollRestoration";
import SSR from "./pages/SSR";
import WhyPage from "./pages/WhyPage";
import BeforeYouBegin from "./pages/BeforeYouBegin";
import FixedListDoc from "./pages/FixedListDoc";
import VariableListDoc from "./pages/VariableListDoc";
import FullWindowFixedListDoc from './pages/FullWindowFixedListDoc'
import FullWindowVariableListDoc from "./pages/FullWindowVariableList";
import ResponsiveWindowContainerDoc from "./pages/ResponsiveWindowContainerDoc";
import ResponsiveCustomWindow from "./pages/ResponsiveCustomWindow";
import ResponsiveContainerDoc from "./pages/ResponsiveContainerDoc";
var stats = new Stats();
stats.dom.style.left = "300px";
stats.dom.style.position = "";
stats.showPanel(0);
// document.body.appendChild(stats.dom);

function animate() {
  stats.begin();

  // monitored code goes here

  stats.end();

  requestAnimationFrame(animate);
}
requestAnimationFrame(animate);

export default function SideNav() {
  const { pathname } = useLocation();
  React.useEffect(() => {
    document.getElementById("statsjs")?.appendChild(stats.dom)
  }, [])
  return (
    <div>
      <Drawer variant="permanent" anchor="left">
        <Typography variant="h6" className="site-title" component="a" href="https://github.com/BotDanny/react-recycled-list" target="_blank">
          react-recycled-list
        </Typography>
        <Divider />
        <ListItem id="statsjs">
          <ListItemText primary="Stats.js:" className="first-level" />
        </ListItem>
        <List>
          <Divider />
          <ListItem>
            <ListItemText primary="Introduction" className="first-level" />
          </ListItem>
          {introductions.map(({ label, route }) => (
            <ListItem
              button
              key={label}
              className="second-level"
              component={Link}
              to={route}
              selected={pathname === route}
            >
              <ListItemText primary={label} />
            </ListItem>
          ))}
          <ListItem>
            <ListItemText primary="Examples" className="first-level" />
          </ListItem>
          {examples.map(({ label, route }) => (
            <ListItem
              button
              key={label}
              className="second-level"
              component={Link}
              to={route}
              selected={pathname === route}
            >
              <ListItemText primary={label} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          <ListItem>
            <ListItemText primary="Components" className="first-level" />
          </ListItem>
          {components.map(({ label, route }) => (
            <ListItem
              button
              key={label}
              className="second-level"
              component={Link}
              to={route}
              selected={pathname === route}
            >
              <ListItemText primary={label} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </div>
  );
}

export const introductions = [
  {
    label: "Why use react recycled list",
    route: "/",
    component: WhyPage
  },
  { label: "Performance demo", route: "/performance", component: Performance },
  { label: "Before you begin", route: "/qa", component: BeforeYouBegin },
];

export const examples = [
  { label: "Simple List", route: "/simple-list", component: SimpleList },
  { label: "Simple Grid", route: "/simple-grid", component: SimpleGrid },
  {
    label: "Variable row height",
    route: "/variable-row-height",
    component: VariableRowHeight,
  },
  {
    label: "Variable column",
    route: "/variable-column",
    component: VariableColumn,
  },
  {
    label: "Variable row height + column ",
    route: "/variable-height-column",
    component: VariableRowHeightColumn,
  },
  { label: "Full window list/grid", route: "/full-window", component: FullWindow },
  { label: "Custom window list/grid", route: "/custom-window", component: CustomWindow },
  {
    label: "Responsive list/grid",
    route: "/responsive-list/grid",
    component: ResponsiveContainerPage,
  },
  {
    label: "Responsive window list/grid",
    route: "/responsive-window",
    component: ResponsiveWindowContainerDemoPage,
  },
  {
    label: "Responsive custom window",
    route: "/responsive-custom-window",
    component: ResponsiveCustomWindow,
  },
  {
    label: "Simple Infinite loading",
    route: "/lazy-loading-simple",
    component: LazyLoadingSimple,
  },
  {
    label: "Advanced Infinite loading",
    route: "/lazy-loading-advance",
    component: LazyLoadingAdvanced,
  },
  {
    label: "Dynamic loading",
    route: "/dynamic-loading",
    component: DynamicLoading,
  },
  {
    label: "Scroll indicator",
    route: "/scroll-indicator",
    component: ScrollIndicator,
  },
  { label: "Scroll to", route: "/scroll-to", component: ScrollTo },
  { label: "Scroll restoration", route: "/scroll-restoration", component: ScrollRestoration },
  { label: "Server side rendering", route: "/ssr", component: SSR },
];

export const components = [
  { label: "FixedSizeList", route: "/fixedsizelist", component: FixedListDoc },
  { label: "VariableSizeList", route: "/variablesizelist", component: VariableListDoc },
  { label: "FullWindowFixedList", route: "/fullwindowfixedList", component: FullWindowFixedListDoc },
  { label: "FullWindowVariableList ", route: "/variablesizewindowList", component: FullWindowVariableListDoc },
  { label: "ResponsiveContainer", route: "/responsivecontainer", component: ResponsiveContainerDoc },
  { label: "ResponsiveWindowContainer", route: "/responsivewindowcontainer", component: ResponsiveWindowContainerDoc },
];
