import HubPage, { hubMetadata } from '../_hub/HubPage';

export const metadata = hubMetadata('parents');

export default function Page() {
  return <HubPage hub="parents" />;
}
