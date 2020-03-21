import React from 'react';
import {Service} from './Service';

export const Context = React.createContext<Service | null>(null);
