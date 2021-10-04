import { Button } from "react-bootstrap"
import { SiteContextProps, useSite } from "../../state/site/site-state.provider"
import { DownloadStyles } from "./download.styles"

const getVersionNumber = (version: string): string => {
  const result = version.split('-')
  return result.length === 1 ? result[0] : result[1]
}

export const DownloadButton = () => { 

  const site: SiteContextProps = useSite()
  const version: string = getVersionNumber(site.state.versionDownload)
  const url = `https://github.com/amboltio/emily-cli/releases/tag/${version}`
    
  return (
    <DownloadStyles.Download>
      <style type="text/css">
        {`
          .btn-primary {
            background-color: white;
            border-radius: 30px;
            color: #7a0029;
            border: 1px solid #7a0029;
          }

          .btn-primary:hover {
            background-color: #7a0029;
            color: white;
            outline: none;
            border: 1px solid white;
          }

          .btn-primary:active, .btn-primary:focus {
            background-color: #7a0029;
            color: white;
            outline: none !important;
            box-shadow: none !important;
            border: 1px solid white;
          }
        `}
      </style>
      <Button href={url} target="_blank" variant="primary" size="lg"><strong>Download Emily {version}</strong></Button>
    </DownloadStyles.Download>
    )
  }