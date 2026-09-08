import React from "react";
import HcpGate from "./src/components/HcpGate";

export const wrapRootElement = ({ element }) => <HcpGate>{element}</HcpGate>;
