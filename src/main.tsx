import {createRoot} from 'react-dom/client'
import CssBaseline from '@mui/material/CssBaseline';
import AppTheme from '@/shared-theme/AppTheme';
import Routes from "@/routes";

import '../flow-config';

import '@style/index.css'

createRoot(document.getElementById('root')!).render(
    <>
        <AppTheme>
            <CssBaseline enableColorScheme/>
            <Routes/>
        </AppTheme>
    </>
)
