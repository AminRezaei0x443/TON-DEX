import {ComponentMeta, ComponentStory} from "@storybook/react";
import React from "react";
import {Provider} from "react-redux";
import Header from "../components/Header";
import {store} from "../redux/store";


export default {
  title: "Header",
  component: Header,
  decorators: [(story) => (<Provider store={store}>{story()}</Provider>)]
} as ComponentMeta<typeof Header>;

const Template: ComponentStory<typeof Header> = () => <Header />;

export const Primary = Template.bind({});
Primary.args = {};

