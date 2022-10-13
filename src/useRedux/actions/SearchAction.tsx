import React from "react";
import { SearchType } from "../types/SearchType";

export interface SearchAction {
  type: SearchType;
  payload: string;
}
