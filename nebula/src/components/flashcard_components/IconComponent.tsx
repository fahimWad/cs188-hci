import React from "react";
import { IconType } from "react-icons";

interface IconStar {
    icon: IconType;
    size?: number;
}

const IconComponent: React.FC<IconStar> = ({ icon: Icon, size = 24 }) => {
    return React.createElement(Icon as React.ComponentType<any>, { size });
};

export default IconComponent;