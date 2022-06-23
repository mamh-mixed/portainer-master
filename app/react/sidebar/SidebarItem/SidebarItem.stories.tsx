import { Meta, Story } from '@storybook/react';

import { SidebarItem } from '.';

const meta: Meta = {
  title: 'Sidebar/SidebarItem',
  component: SidebarItem,
};
export default meta;

interface StoryProps {
  icon?: string;
  label: string;
}

function Template({ icon: iconClass, label }: StoryProps) {
  return (
    <ul className="sidebar">
      <SidebarItem
        to="example.path"
        params={{ endpointId: 1 }}
        icon={iconClass}
        label={label}
      />
    </ul>
  );
}

export const Primary: Story<StoryProps> = Template.bind({});
Primary.args = {
  icon: 'fa-tachometer-alt fa-fw',
  label: 'Item with icon',
};

export const WithoutIcon: Story<StoryProps> = Template.bind({});
WithoutIcon.args = {
  label: 'Item without icon',
};
