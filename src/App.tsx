import { ToastContainer } from 'react-toastify';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from './global/style';
import { AppThemes, DarkTheme, LightTheme } from './global/style/themes';
import { useSite } from './state/site/site-state.provider';
import 'react-toastify/dist/ReactToastify.css';
import { Header } from './components/header/header';
import { ContentContainerStyles } from './components/content-container/content-container.styles';
import { CommandDocumentation } from './components/command-documentation/command-documentation';
import { ReleaseSelector } from './components/git-object-selection/release-selector';
import { FooterStyles } from './components/footer/footer.styles';
import { Footer } from './components/footer/footer';
import { DescriptionStyles } from './components/description/description.styles';
import { DownloadStyles } from './components/download/download.styles';
import { DownloadButton } from './components/download/download-button';
import { AppStyles } from './App.styles';
import { HR1 } from './components/line-break/line-break';
import ReactMarkdown from 'react-markdown';
import { BranchInput } from './components/git-object-selection/branch-input';
import { GitObjectSelectionDev, GitObjectSelection } from './components/git-object-selection/git-object-selection';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

const App = () => {

  const site = useSite()

  return (
    <AppStyles.Container>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover />
      <Header />

      <DescriptionStyles.Description>
        Emily combines the powers of Python and Docker to build stable and consistent machine learning and datascience python environments. Emily is useful for large cross-team project development as well as for simply running a single jupyter notebook or python script.
      </DescriptionStyles.Description>

      <DownloadButton />
      <HR1 />

      <Router>
        <Switch>
          <Route path="/dev">
            <GitObjectSelectionDev />
          </Route>
          <Route path="/">
            <GitObjectSelection />
          </Route>
        </Switch>
      </Router>

      <ContentContainerStyles.Container>
        <CommandDocumentation version={'branch/development'} command={site.state.command ?? 'open'} childCommand={site.state.childCommand} />
      </ContentContainerStyles.Container>

      <Footer />
    </AppStyles.Container>
  );
}

export default App;
