import {RenderComponentModel} from "./render-component.model";

export interface ConfigColumnsModel {
  displayName: string;
  objectKey: string;
  renderComponent?: RenderComponentModel;
  customRowValue? (row: any, objectKey: string): string;
}
