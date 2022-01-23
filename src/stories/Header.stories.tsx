import {ComponentMeta, ComponentStory} from '@storybook/react';
import React from 'react';
import Header from '../components/Header';


export default {
  title: 'Header',
  component: Header,
} as ComponentMeta<typeof Header>;

const Template: ComponentStory<typeof Header> = () => <Header />;

export const Primary = Template.bind({});
Primary.args = {};

