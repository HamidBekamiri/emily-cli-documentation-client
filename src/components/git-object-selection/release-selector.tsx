import { Dropdown } from "react-bootstrap"
import { toast } from "react-toastify"
import { useVersions } from "../../hooks/http.hooks"
import { SiteContextProps, useSite } from "../../state/site/site-state.provider"
import { ReleaseSelectorStyles } from "./release-selector.styles"

export const ReleaseSelector = () => {
  const site: SiteContextProps = useSite()
  const { data, error } = useVersions()
  // if (error) return processAndShowError(error)

  if (!data) return renderEmptyDropdown()

  const dropdownItems: JSX.Element[] = getDropdownItems(data, site)
  const latest: string = data[-1] || site.state.version
  return (
    <ReleaseSelectorStyles.ReleaseSelector>
      <style type="text/css">
        {`
          .btn-secondary {
            background-color: #7a0029;
            border-radius: 0px;
            color: white;
            border: 1px solid white;
          }

          .btn-secondary:hover {
            background-color: white;
            color: #7a0029;
            border: 1px solid #7a0029;
          }

          .btn-secondary:active, .btn-secondary:focus {
            background-color: white !important;
            color: #7a0029 !important;
            box-shadow: none !important;
            border: 1px solid #7a0029 !important;
          }

          #dropdown {
            font-size: 0px;
          }
        `}
      </style>
      <Dropdown id="dropdown">
        <Dropdown.Toggle variant="secondary" size="lg">
          {latest}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {dropdownItems}
        </Dropdown.Menu>
      </Dropdown>
    </ReleaseSelectorStyles.ReleaseSelector>
  )
}

const renderEmptyDropdown = () => {
  return (
    <ReleaseSelectorStyles.ReleaseSelector>
        <style type="text/css">
        {`
          .no-versions-message {
            float:right;
            color: white;
            font-size: 20px !important;
            text-align: right;
          }
        `}
      </style>
      <p className="no-versions-message">We apologize, there are no Emily versions available at the moment, please check in a few minutes.</p>
    </ReleaseSelectorStyles.ReleaseSelector>
  )
}

const getDropdownItems = (versions: string[], site: SiteContextProps): JSX.Element[] => {
  const items = []
  
  for (const version of versions) {
    const item: JSX.Element = <Dropdown.Item key={version} onClick={() => clickHandler(version, site)}>{version}</Dropdown.Item>
    items.push(item)
  }
  return items.reverse()
}

const clickHandler = (version: string, site: SiteContextProps): void => {
  site.changeVersionDownload(version)
}

const processAndShowError = (error: any) => {
  let msg = ''
  try { msg = error.errors.join('\n') }
  catch { msg = 'Something went wrong.' }
  return showError(msg)
}

const showError = (msg: string) => {
  toast(msg, {
    toastId: msg,
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
  return <></>
}