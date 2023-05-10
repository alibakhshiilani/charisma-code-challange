import React from "react";
import { shallow } from "enzyme";
import { LinkProps } from "./Home";
import Home from "./Home";
import { Tag } from "../../store/tags/models/Tag";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";

describe("Home component", () => {
  let props: any;
  let mockBoundRequestTags: jest.Mock;
  let mockSelectTag: jest.Mock;
  const mockStore = configureStore([]);

  beforeEach(() => {
    mockBoundRequestTags = jest.fn();
    mockSelectTag = jest.fn();

    props = {
      tags: [
        { id: 1, title: "Tag 1", completed: false },
        { id: 2, title: "Tag 2", completed: true },
      ] as Tag[],
      selectedTags: [1],
      boundRequestTags: mockBoundRequestTags,
      selectTag: mockSelectTag,
    };
  });

  it("should render correctly", () => {
    const store = mockStore({ tagReducer: { tags: [], selectedTags: [] } });
    const wrapper = shallow(
      <Provider store={store}>
        <Home {...props} />
      </Provider>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it("should call boundRequestTags on mount", () => {
    const store = mockStore({ tagReducer: { tags: [], selectedTags: [] } });
    shallow(
      <Provider store={store}>
        <Home {...props} />
      </Provider>
    );
    expect(mockBoundRequestTags).toHaveBeenCalled();
  });

  it("should call selectTag when a tag is clicked", () => {
    const store = mockStore({ tagReducer: { tags: [], selectedTags: [] } });
    const wrapper = shallow(
      <Provider store={store}>
        <Home {...props} />
      </Provider>
    );
    const tagId = 2;
    wrapper.find(`[key="${tagId}"]`).simulate("click");
    expect(mockSelectTag).toHaveBeenCalledWith(tagId);
  });

  it("should filter tags based on search query", () => {
    const store = mockStore({ tagReducer: { tags: [], selectedTags: [] } });
    const wrapper = shallow(
      <Provider store={store}>
        <Home {...props} />
      </Provider>
    );
    const searchQuery = "2";
    wrapper
      .find("TextField")
      .simulate("change", { target: { value: searchQuery } });
    expect(wrapper.find("ListItem")).toHaveLength(1);
    expect(wrapper.find("ListItem").prop("key")).toEqual(2);
  });
});
