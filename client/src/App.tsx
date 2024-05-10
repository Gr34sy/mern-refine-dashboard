import { AuthBindings, Authenticated, Refine } from "@refinedev/core";
// import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import {
  Edit,
  ErrorComponent,
  notificationProvider,
  RefineSnackbarProvider,
} from "@refinedev/mui";

import { ThemedLayoutV2 } from "./components";

import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";
import routerBindings, {
  CatchAllNavigate,
  DocumentTitleHandler,
  NavigateToResource,
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import dataProvider from "@refinedev/simple-rest";
import axios from "axios";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { ColorModeContextProvider } from "./contexts/color-mode";
import { CredentialResponse } from "./interfaces/google";
import { Login } from "./pages/login";
import { parseJwt } from "./utils/parse-jwt";

import { ThemedHeaderV2, ThemedSiderV2, ThemedTitleV2 } from "./components";
import {
  AccountCircleOutlined,
  ChatBubbleOutline,
  PeopleAltOutlined,
  StarOutlineRounded,
  VillaOutlined,
  SpaceDashboard,
} from "@mui/icons-material";
import {
  Home,
  AgentProfile,
  Agents,
  AllProperties,
  CreateProperty,
  EditProperty,
  PropertyDetails,
  MyProfile,
  CreateReview,
  EditProfile,
  AllReviews,
  EditReview,
  ReviewDetails,
} from "./pages";

const axiosInstance = axios.create();
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (config.headers) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }

  return config;
});

function App() {
  const authProvider: AuthBindings = {
    login: async ({ credential }: CredentialResponse) => {
      const profileObj = credential ? parseJwt(credential) : null;

      if (profileObj) {
        const response = await fetch("http://localhost:8080/api/v1/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: profileObj.name,
            email: profileObj.email,
            avatar: profileObj.picture,
          }),
        });

        const data = await response.json();

        if (response.status === 200) {
          localStorage.setItem(
            "user",
            JSON.stringify({
              ...profileObj,
              avatar: profileObj.picture,
              userid: data._id,
              admin: false,
            })
          );
          localStorage.setItem("token", `${credential}`);

          return {
            success: true,
            redirectTo: "/",
          };
        }
      }

      return {
        success: false,
      };
    },
    logout: async () => {
      const token = localStorage.getItem("token");

      if (token && typeof window !== "undefined") {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        axios.defaults.headers.common = {};
        window.google?.accounts.id.revoke(token, () => {
          return {};
        });
      }

      return {
        success: true,
        redirectTo: "/login",
      };
    },
    onError: async (error) => {
      console.error(error);
      return { error };
    },
    check: async () => {
      const token = localStorage.getItem("token");

      if (token) {
        return {
          authenticated: true,
        };
      }

      return {
        authenticated: false,
        error: {
          message: "Check failed",
          name: "Token not found",
        },
        logout: true,
        redirectTo: "/login",
      };
    },
    getPermissions: async () => null,
    getIdentity: async () => {
      const user = localStorage.getItem("user");
      if (user) {
        return JSON.parse(user);
      }

      return null;
    },
  };

  return (
    <BrowserRouter>
      <RefineKbarProvider>
        <ColorModeContextProvider>
          <CssBaseline />
          <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
          <RefineSnackbarProvider>
            <Refine
              dataProvider={dataProvider("http://localhost:8080/api/v1")}
              notificationProvider={notificationProvider}
              routerProvider={routerBindings}
              authProvider={authProvider}
              resources={[
                {
                  name: "dashboard",
                  options: { label: "Dashboard" },
                  list: "/dashboard",
                  icon: <SpaceDashboard />,
                },
                {
                  name: "properties",
                  list: AllProperties,
                  show: PropertyDetails,
                  create: CreateProperty,
                  edit: EditProperty,
                  icon: <VillaOutlined />,
                },
                {
                  name: "agents",
                  list: Agents,
                  show: AgentProfile,
                  icon: <PeopleAltOutlined />,
                },
                {
                  name: "reviews",
                  list: AllReviews,
                  show: ReviewDetails,
                  create: CreateReview,
                  edit: EditReview,
                  icon: <StarOutlineRounded />,
                },
                {
                  name: "my-profile",
                  options: { label: "My Profile" },
                  list: MyProfile,
                  edit: EditProfile,
                  icon: <AccountCircleOutlined />,
                },
              ]}
              options={{
                syncWithLocation: true,
                warnWhenUnsavedChanges: true,
                useNewQueryKeys: true,
                projectId: "9DGvLp-PoLUkA-txMFQu",
              }}
            >
              <Routes>
                <Route
                  element={
                    <Authenticated
                      key="authenticated-inner"
                      fallback={<CatchAllNavigate to="/login" />}
                    >
                      <ThemedLayoutV2
                        Header={ThemedHeaderV2}
                        Sider={ThemedSiderV2}
                        Title={ThemedTitleV2}
                      >
                        <Outlet />
                      </ThemedLayoutV2>
                    </Authenticated>
                  }
                >
                  <Route
                    index
                    element={<NavigateToResource resource="/dashboard" />}
                  />

                  <Route path="/dashboard">
                    <Route index element={<Home />} />
                  </Route>

                  <Route path="/properties">
                    <Route index element={<AllProperties />} />
                    <Route path="create" element={<CreateProperty />} />
                    <Route path="show/:id" element={<PropertyDetails />} />
                    <Route path="edit/:id" element={<EditProperty />} />
                  </Route>

                  <Route path="/agents">
                    <Route index element={<Agents />} />
                    <Route path="show/:id" element={<AgentProfile/>}/>
                  </Route>

                  <Route path="/reviews">
                    <Route index element={<AllReviews />} />
                    <Route path="create/:id" element={<CreateReview />} />
                    <Route path="show/:id" element={<ReviewDetails />} />
                    <Route path="edit/:id" element={<EditReview />} />
                  </Route>

                  <Route path="/my-profile">
                    <Route index element={<MyProfile />} />
                    <Route path="edit/:id" element={<EditProfile />} />
                  </Route>

                </Route>
                <Route
                  element={
                    <Authenticated
                      key="authenticated-outer"
                      fallback={<Outlet />}
                    >
                      <NavigateToResource />
                    </Authenticated>
                  }
                >
                  <Route path="/login" element={<Login />} />
                </Route>
              </Routes>

              <RefineKbar />
              <UnsavedChangesNotifier />
              <DocumentTitleHandler />
            </Refine>
          </RefineSnackbarProvider>
        </ColorModeContextProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
