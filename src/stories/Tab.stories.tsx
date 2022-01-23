import {ComponentMeta, ComponentStory} from '@storybook/react';
import React from 'react';
import Info from '../components/icons/Info';
import Liquidity from '../components/icons/Liquidity';
import Swap from '../components/icons/Swap';
import Tab from '../components/Tab';


export default {
  title: 'Tab',
  component: Tab,
} as ComponentMeta<typeof Tab>;

const Template: ComponentStory<typeof Tab> = (args) => <Tab {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  selected:0,
  items:[{icon:Swap, label:"Swap"},
    {icon:Liquidity, label:"Liquidity"},
    {icon:Info, label:"Info"}]
};

