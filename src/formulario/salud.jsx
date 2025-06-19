import React, { useState } from 'react';
import {
    Box,
    Grid,
    Typography,
    TextField,
    Button,
    Card,
    CardContent,
    ToggleButtonGroup,
    ToggleButton,
    Avatar,
    Stepper,
    Step,
    StepLabel,
    StepConnector,
    stepConnectorClasses
} from '@mui/material';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import { 
    ArrowBack, 
    CloudDownloadOutlined, 
    ShareOutlined, 
    CompareArrowsOutlined,
    LocalHospital, // Icono para Gastos Mayores
    FavoriteBorder // Icono para Salud
} from '@mui/icons-material';

// --- THEME AND STYLED COMPONENTS --- //

const theme = createTheme({
    palette: {
        primary: {
            main: '#4F46E5', // Azul/Morado principal
        },
        secondary: {
            main: '#14B8A6', // Turquesa para selecciones y acentos
        },
        background: {
            default: '#F7F8FC', // Fondo ligeramente gris/azulado
            paper: '#FFFFFF',
        },
        text: {
            primary: '#1F2937',
            secondary: '#6B7280',
        },
        divider: '#E5E7EB',
    },
    typography: {
        fontFamily: 'Inter, sans-serif',
        h4: {
            fontWeight: 700,
            color: '#1F2937',
        },
        h6: {
            fontWeight: 700,
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: '8px',
                    textTransform: 'none',
                    fontWeight: 600,
                    boxShadow: 'none',
                },
                containedPrimary: {
                    color: 'white',
                },
                outlined: {
                    borderWidth: '1px',
                }
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: '16px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                },
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    borderRadius: '8px',
                    backgroundColor: '#FFFFFF',
                },
            },
        },
        MuiToggleButton: {
            styleOverrides: {
                root: {
                    borderRadius: '8px !important',
                    border: '1px solid #D1D5DB !important',
                    textTransform: 'none',
                    '&.Mui-selected': {
                        backgroundColor: '#EEF2FF',
                        color: '#4F46E5',
                        '&:hover': {
                            backgroundColor: '#E0E7FF',
                        },
                    },
                },
            },
        },
        MuiStepLabel: {
            styleOverrides: {
                label: {
                     '&.Mui-active': {
                        fontWeight: 'bold',
                     },
                     '&.Mui-completed': {
                        fontWeight: 'bold',
                     }
                }
            }
        }
    },
});

const CustomConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
    left: 'calc(-50% + 16px)',
    right: 'calc(50% + 16px)',
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: theme.palette.secondary.main,
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: theme.palette.secondary.main,
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor: theme.palette.divider,
    borderTopWidth: 3,
    borderRadius: 1,
  },
}));

const SelectionCard = styled(Card)(({ theme, selected }) => ({
    padding: theme.spacing(2),
    textAlign: 'center',
    cursor: 'pointer',
    height: '100%',
    border: `2px solid ${selected ? theme.palette.secondary.main : 'transparent'}`,
    backgroundColor: selected ? '#F0FDF4' : theme.palette.background.paper,
    boxShadow: 'none',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    '&:hover': {
        borderColor: theme.palette.secondary.main,
        boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
    },
}));

// Mock Data
const insurancePlans = [
    {
        logo: 'https://placehold.co/60x60/FBBF24/FFFFFF?text=S',
        company: 'SWEADEN',
        subCompany: 'Compañia de Seguros S.A.',
        name: 'Seguro Vida Colectiva',
        price: '14,90',
        coverage: '25000',
        psychology: '3 Sesiones',
        salary: '700',
    },
    {
        logo: 'https://placehold.co/60x60/F97316/FFFFFF?text=H',
        company: 'Hispana de Seguros',
        name: 'Seguro Vida Oncológico',
        price: '19,90',
        coverage: '30000',
        psychology: '4 Sesiones',
        salary: '900',
    },
    {
        logo: 'https://placehold.co/60x60/3B82F6/FFFFFF?text=L',
        company: 'Latina SEGUROS',
        name: 'Seguro Cáncer Care',
        price: '24,90',
        coverage: '40000',
        psychology: '5 Sesiones',
        salary: '1000',
    },
];

const steps = ['Personal', 'Dependientes', 'Planes'];

// --- MAIN APP COMPONENT --- //
export default function App() {
    const [activeStep, setActiveStep] = useState(0);
    const [formData, setFormData] = useState({
        insuranceType: 'Salud',
        searchPreference: 'Respaldo de la aseguradora',
        isFamily: 'No',
    });

    const handleFormChange = (key, value) => {
        setFormData(prev => ({ ...prev, [key]: value }));
    };

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        if (activeStep > 0) {
            setActiveStep((prevActiveStep) => prevActiveStep - 1);
        } else {
             console.log("Volviendo a la página principal");
        }
    };
    
    const getStepContent = (step) => {
        switch (step) {
            case 0:
                return <PersonalForm onNext={handleNext} formData={formData} setFormData={handleFormChange} />;
            case 1:
                return <DependientesForm onNext={handleNext} formData={formData} setFormData={handleFormChange} />;
            case 2:
                return <ResultsView plans={insurancePlans} />;
            default:
                return 'Unknown step';
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ minHeight: '100vh', backgroundColor: 'background.default', p: { xs: 2, sm: 3, md: 4 } }}>
                <Box sx={{ maxWidth: '1200px', mx: 'auto' }}>
                    <Box display="flex" alignItems="center" mb={4}>
                        <Button startIcon={<ArrowBack />} onClick={handleBack} sx={{ color: 'text.secondary', fontWeight: 400, mr: {xs: 1, md: 2} }}>
                            Volver
                        </Button>
                        <Box sx={{ flexGrow: 1, mx: { xs: 1, sm: 2 } }}>
                            <Stepper activeStep={activeStep} alternativeLabel connector={<CustomConnector />}>
                                {steps.map((label) => (
                                    <Step key={label}><StepLabel>{label}</StepLabel></Step>
                                ))}
                            </Stepper>
                        </Box>
                        <Typography variant="h6" component="div" sx={{ color: theme.palette.primary.main, fontWeight: 'bold' }}>
                            abcseguros
                        </Typography>
                    </Box>
                    {getStepContent(activeStep)}
                </Box>
            </Box>
        </ThemeProvider>
    );
}

// --- STEP 1: PERSONAL FORM --- //
const PersonalForm = ({ onNext, formData, setFormData }) => {
    return (
       <Grid container spacing={{ xs: 4, md: 6 }}>
            <Grid item xs={12} md={7} lg={6}>
                <Box>
                    <Typography variant="h4" gutterBottom>Cotizador de Salud</Typography>
                    <Typography variant="body1" color="text.secondary" mb={4}>Selecione el tipo de seguro de Salud</Typography>
                    <Grid container spacing={2} mb={5}>
                        <Grid item xs={6}>
                            <SelectionCard selected={formData.insuranceType === 'Gastos Mayores'} onClick={() => setFormData('insuranceType', 'Gastos Mayores')}>
                                <LocalHospital sx={{ fontSize: 40, color: formData.insuranceType === 'Gastos Mayores' ? 'secondary.main' : '#F472B6', mb: 1 }} />
                                <Typography variant="h6" fontSize="1rem">Gastos Mayores</Typography>
                            </SelectionCard>
                        </Grid>
                        <Grid item xs={6}>
                            <SelectionCard selected={formData.insuranceType === 'Salud'} onClick={() => setFormData('insuranceType', 'Salud')}>
                                <FavoriteBorder sx={{ fontSize: 40, color: formData.insuranceType === 'Salud' ? 'secondary.main' : '#FBBF24', mb: 1 }} />
                                <Typography variant="h6" fontSize="1rem">Salud</Typography>
                            </SelectionCard>
                        </Grid>
                    </Grid>

                    <Typography variant="h6" gutterBottom>Formulário de Seguro</Typography>
                    <Typography variant="body2" color="text.secondary" mb={2}>Datos personales</Typography>
                    <Grid container spacing={2} mb={5}>
                        <Grid item xs={12} sm={6}><TextField fullWidth label="Nombres completos" defaultValue="Maria Luisa" /></Grid>
                        <Grid item xs={12} sm={6}><TextField fullWidth label="Apellidos completos" defaultValue="Alvarez Piedra" /></Grid>
                        <Grid item xs={12} sm={6}><TextField fullWidth label="Fecha de nacimiento" defaultValue="06/05/2000" /></Grid>
                    </Grid>
                    <Button variant="contained" size="large" fullWidth onClick={onNext} sx={{ py: 1.5 }}>
                        Siguiente
                    </Button>
                </Box>
            </Grid>
            <FormImage />
        </Grid>
    );
}

// --- STEP 2: DEPENDIENTES FORM --- //
const DependientesForm = ({ onNext, formData, setFormData }) => {
    return (
        <Grid container spacing={{ xs: 4, md: 6 }}>
            <Grid item xs={12} md={7} lg={6}>
                <Box>
                    <Typography variant="h4" gutterBottom>Perfil del asegurado</Typography>
                     <Typography variant="body1" color="text.secondary" mb={4}>Complete la información de los acompañantes.</Typography>
                    
                    <Typography variant="h6" gutterBottom>Perfil del asegurado y acompañantes</Typography>
                    <Typography variant="body2" color="text.secondary" mb={2}>¿Qué busca en un seguro?</Typography>
                    <ToggleButtonGroup value={formData.searchPreference} exclusive onChange={(e, val) => val && setFormData('searchPreference', val)} fullWidth sx={{ mb: 4, '& .MuiToggleButton-root': {flex: 1} }}>
                        <ToggleButton value="Beneficios">Beneficios</ToggleButton>
                        <ToggleButton value="Respaldo de la aseguradora">Respaldo de la aseguradora</ToggleButton>
                        <ToggleButton value="Precio">Precio</ToggleButton>
                    </ToggleButtonGroup>

                    <Typography variant="body2" color="text.secondary" mb={1}>¿Es una cotización familiar?</Typography>
                    <ToggleButtonGroup value={formData.isFamily} exclusive onChange={(e, val) => val && setFormData('isFamily', val)} sx={{ mb: 4 }}>
                        <ToggleButton value="Si">Sí</ToggleButton>
                        <ToggleButton value="No">No</ToggleButton>
                    </ToggleButtonGroup>
                     {formData.isFamily === 'Si' && (
                        <Grid container spacing={2} mb={2}>
                             <Grid item xs={12} sm={6}>
                                <TextField fullWidth label="Nombre del familiar" />
                            </Grid>
                             <Grid item xs={12} sm={6}>
                                <TextField fullWidth label="Edad" />
                            </Grid>
                        </Grid>
                    )}

                    <Button variant="contained" size="large" fullWidth onClick={onNext} sx={{ py: 1.5 }}>
                        Cotizar
                    </Button>
                </Box>
            </Grid>
            <FormImage />
        </Grid>
    )
}

// --- Reusable Image Component --- //
const FormImage = () => (
    <Grid item md={5} lg={6} sx={{ display: { xs: 'none', md: 'block' } }}>
        <Box sx={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '24px', overflow: 'hidden', backgroundColor: '#FFE4E6' }}>
           <img 
               src="https://plus.unsplash.com/premium_photo-1675686363489-21a2a573b2c6?q=80&w=1974&auto=format&fit=crop"
               alt="Estetoscopio en forma de corazón sostenido por manos" 
               style={{ width: '80%', height: 'auto', objectFit: 'contain' }}
            />
        </Box>
    </Grid>
);


// --- RESULTS VIEW COMPONENT --- //
const ResultsView = ({ plans }) => {
    return (
        <Box>
            <Typography variant="h4" gutterBottom>Cotizador de Salud</Typography>
            <Typography variant="body1" color="text.secondary" mb={4}>Selecione la mejor opcion de seguro de Salud</Typography>
            <Grid container spacing={3}>
                {plans.map((plan, index) => (
                    <Grid item xs={12} md={6} lg={4} key={index}>
                        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                            <CardContent sx={{ flexGrow: 1 }}>
                                <Box display="flex" alignItems="center" mb={2}>
                                    <Avatar src={plan.logo} sx={{ width: 60, height: 60, mr: 2, bgcolor: 'grey.200' }} variant="rounded" />
                                    <Box>
                                        <Typography variant="h6" fontSize="1.1rem">{plan.company}</Typography>
                                        {plan.subCompany && <Typography variant="caption" color="text.secondary">{plan.subCompany}</Typography>}
                                    </Box>
                                </Box>
                                <Typography variant="h6" component="h3" gutterBottom>{plan.name}</Typography>
                                <Typography variant="h5" fontWeight="bold" mb={2}>
                                    ${plan.price}<Typography component="span" color="text.secondary">/mes</Typography>
                                </Typography>
                                <Box component="ul" sx={{ pl: 2.5, '& li': { mb: 0.5 } }}>
                                    <li><Typography variant="body2">Monto de cobertura: ${plan.coverage}</Typography></li>
                                    <li><Typography variant="body2">Terapia Psicológica: {plan.psychology}</Typography></li>
                                    <li><Typography variant="body2">Sueldo Mensual por 1 año: ${plan.salary}</Typography></li>
                                </Box>
                                <Button size="small" sx={{ mt: 1, p:0 }}>Ver más</Button>
                            </CardContent>
                            <Box sx={{ p: 2, pt: 0, borderTop: '1px solid #F3F4F6' }}>
                                <Grid container spacing={1} mb={2} justifyContent="space-between">
                                    <Grid item><Button size="small" variant="outlined" sx={{ color: 'text.secondary', borderColor: 'divider' }} startIcon={<CloudDownloadOutlined />}>Descargar</Button></Grid>
                                    <Grid item><Button size="small" variant="outlined" sx={{ color: 'text.secondary', borderColor: 'divider' }} startIcon={<ShareOutlined />}>Compartir</Button></Grid>
                                    <Grid item><Button size="small" variant="outlined" sx={{ color: 'text.secondary', borderColor: 'divider' }} startIcon={<CompareArrowsOutlined />}>Comparar</Button></Grid>
                                </Grid>
                                <Button variant="contained" color="secondary" fullWidth sx={{ color: 'white' }}>
                                    Seleccionar este plan
                                </Button>
                            </Box>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};
