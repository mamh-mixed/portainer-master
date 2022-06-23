import { SidebarItem } from './SidebarItem';
import { SidebarSection } from './SidebarSection';

export function EdgeComputeSidebar() {
  return (
    <SidebarSection title="Edge compute">
      <SidebarItem
        to="edge.devices"
        icon="fas fa-laptop-code fa-fw"
        label="Edge Devices"
        featherIcon={false}
      />
      <SidebarItem
        to="edge.groups"
        icon="fa-object-group fa-fw"
        label="Edge Groups"
        featherIcon={false}
      />
      <SidebarItem
        to="edge.stacks"
        icon="fa-layer-group fa-fw"
        label="Edge Stacks"
        featherIcon={false}
      />
      <SidebarItem
        to="edge.jobs"
        icon="fa-clock fa-fw"
        label="Edge Jobs"
        featherIcon={false}
      />
    </SidebarSection>
  );
}
