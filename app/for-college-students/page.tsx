import HubPage, { hubMetadata } from '../_hub/HubPage';

export const metadata = hubMetadata('university');

export default function Page() {
  return <HubPage hub="university" />;
}
