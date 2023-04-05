import {RenderComponentModel} from "./render-component.model";

export interface ConfigColumnsModel {
  displayName: string;
  objectKey?: string;
  renderComponent?: RenderComponentModel;
  templateColumn?: boolean;
  rawValue? (row: any, objectKey: string): string;
}
