import HubPage, { hubMetadata } from '../_hub/HubPage';

export const metadata = hubMetadata('senior-high');

export default function Page() {
  return <HubPage hub="senior-high" />;
}
