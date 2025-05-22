"use client"

import React, { useState } from "react"
import {
  Box,
  Typography,
  Container,
  Paper,
  Grid,
  Button,
  IconButton,
  Avatar,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  ListItemSecondaryAction,
  Divider,
} from "@mui/material"
import { Favorite, FavoriteBorder, Edit, Add, Check } from "@mui/icons-material"
import { styled } from "@mui/material/styles"

// Iconos personalizados para los tipos de seguro
const HeartIcon = ({ size = 40 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
)

const PersonIcon = ({ size = 40 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 2a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5zm0 13c5.523 0 10 2.238 10 5v2H2v-2c0-2.762 4.477-5 10-5z" />
    <path d="M12 8v4M10 10h4" />
  </svg>
)

const CarIcon = ({ size = 40 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M16 6l3 4h2a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-1a3 3 0 0 1-3 3 3 3 0 0 1-3-3H9a3 3 0 0 1-3 3 3 3 0 0 1-3-3H2a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h2l3-4h9z" />
    <circle cx="7" cy="16" r="1" />
    <circle cx="17" cy="16" r="1" />
  </svg>
)


// Componentes estilizados
const StyledSidebar = styled(Box)(({ theme }) => ({
  backgroundColor: "#6366F1",
  color: "white",
  height: "100vh",
  width: 75,
  position: "fixed",
  left: 0,
  top: 0,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: theme.spacing(2, 0),
  zIndex: 10,
  [theme.breakpoints.down("sm")]: {
    flexDirection: "row",
    width: "100%",
    height: 60,
    position: "fixed",
    left: 0,
    top: 0,
    padding: theme.spacing(0, 2),
    justifyContent: "center",
  },
}))

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  color: "white",
  margin: theme.spacing(1, 0),
  [theme.breakpoints.down("sm")]: {
    margin: theme.spacing(0, 1),
    padding: 6,
  },
}))

const StyledLabel = styled(Typography)(({ theme }) => ({
  fontSize: "12px",
  marginTop: theme.spacing(0.5),
  [theme.breakpoints.down("sm")]: {
    fontSize: "10px",
    marginTop: 0,
  },
}))

const InsuranceTypeIcon = styled(Avatar)(({ theme }) => ({
  backgroundColor: "#FFEB3B",
  color: "#333",
  width: 80,
  height: 80,
  "& svg": {
    width: 40,
    height: 40,
  },
  [theme.breakpoints.down("sm")]: {
    width: 48,
    height: 48,
    "& svg": {
      width: 24,
      height: 24,
    },
  },
}))

const HeroSection = styled(Paper)(({ theme }) => ({
  backgroundColor: "#6366F1",
  color: "white",
  padding: theme.spacing(4),
  borderRadius: 16,
  marginBottom: theme.spacing(3),
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(2),
    borderRadius: 8,
  },
}))

const StyledTab = styled(Tab)(({ theme }) => ({
  borderRadius: "20px",
  margin: theme.spacing(0, 0.5),
  "&.Mui-selected": {
    backgroundColor: "#6366F1",
    color: "white",
  },
}))

const StyledTabs = styled(Tabs)(({ theme }) => ({
  "& .MuiTabs-indicator": {
    display: "none",
  },
  marginBottom: theme.spacing(3),
}))

const DetailButton = styled(Button)(({ theme }) => ({
  borderRadius: "20px",
  textTransform: "none",
}))

export const Landing = () => {
  const [tabValue, setTabValue] = useState(0)
  const [favorites, setFavorites] = useState({})

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue)
  }

  const toggleFavorite = (id) => {
    setFavorites((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  const recentQuotes = [
    {
      id: 1,
      type: "Vida",
      name: "Carlos R.",
      location: "Quito",
      status: "Aguardando confirmación",
      price: "$18.90",
      period: "mes",
      time: "Hoy, 10:32 a.m.",
    },
    {
      id: 2,
      type: "Salud",
      name: "Laura D.",
      location: "Ambato",
      status: "Cotización incompleta",
      issue: "Falta de datos: contacto y beneficiarios",
      time: "Hace 2 horas",
    },
    {
      id: 3,
      type: "Auto",
      name: "Mario V.",
      location: "Loja",
      status: "Cotización completada",
      price: "$17.90",
      period: "mensual",
      annual: "$198",
      time: "Hace 3 días",
    },
  ]

  return (
    <Box sx={{ display: "flex", bgcolor: "#f5f5f5", height: "100%" }}>
      {/* Sidebar */}
      <StyledSidebar>
        <StyledIconButton>
          <Add fontSize="small" />
          <StyledLabel>Label</StyledLabel>
        </StyledIconButton>
        <StyledIconButton>
          <Add fontSize="small" />
          <StyledLabel>Label</StyledLabel>
        </StyledIconButton>
        <StyledIconButton>
          <Add fontSize="small" />
          <StyledLabel>Label</StyledLabel>
        </StyledIconButton>
      </StyledSidebar>

      {/* Main Content */}
      <Container
        maxWidth="100%"
        sx={{
          ml: { xs: 0, sm: "75px" },
          pt: { xs: 8, sm: 4 },
          pb: 4,
        }}
      >
        {/* Hero Section */}
        {/* Hero Section */}
        <HeroSection elevation={0}>
          <Grid container spacing={4} alignItems="stretch" justifyContent="space-between" sx={{ minHeight: "200px" }}>
            {/* Texto alineado abajo a la izquierda */}
            <Grid item xs={12} md={6} sx={{ display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
              <Box>
                <Typography
                  variant="h4"
                  component="h1"
                  fontWeight="bold"
                  gutterBottom
                  sx={{ fontSize: { xs: "1.8rem", sm: "2.3rem", md: "2.5rem" } }}
                >
                  Inicia tu cotización
                </Typography>
                <Typography variant="subtitle1" sx={{ fontSize: { xs: "1rem", sm: "1.25rem" } }}>
                  Escoge el tipo de cotización
                </Typography>
              </Box>
            </Grid>

            {/* Iconos */}
            <Grid item xs={12} md={6} sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Grid container spacing={4} justifyContent="center">
                <Grid item xs={4} sx={{ textAlign: "center" }}>
                  <InsuranceTypeIcon>
                    <HeartIcon size={48} />
                  </InsuranceTypeIcon>
                  <Typography variant="body1" sx={{ mt: 1, fontSize: { xs: "0.9rem", sm: "1.1rem" } }}>
                    Vida
                  </Typography>
                </Grid>
                <Grid item xs={4} sx={{ textAlign: "center" }}>
                  <InsuranceTypeIcon>
                    <HeartIcon size={48} />
                  </InsuranceTypeIcon>

                  <Typography variant="body1" sx={{ mt: 1, fontSize: { xs: "0.9rem", sm: "1.1rem" } }}>
                    Salud
                  </Typography>
                </Grid>
                <Grid item xs={4} sx={{ textAlign: "center" }}>
                  <InsuranceTypeIcon>
                    <CarIcon size={48} />
                  </InsuranceTypeIcon>
                  <Typography variant="body1" sx={{ mt: 1, fontSize: { xs: "0.9rem", sm: "1.1rem" } }}>
                    Auto
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </HeroSection>


        {/* Tabs */}
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <StyledTabs value={tabValue} onChange={handleTabChange} aria-label="navigation tabs" variant="fullWidth">
            <StyledTab icon={<Check />} label="Cotizaciones" iconPosition="start" />
            <StyledTab label="Contactos" />
          </StyledTabs>
        </Box>

        {/* Recent Quotes Section */}
        <Box sx={{ mt: 4 }}>
          <Typography
            variant="h5"
            component="h2"
            fontWeight="bold"
            gutterBottom
            sx={{ fontSize: { xs: "1.2rem", sm: "1.5rem", md: "2rem" } }}
          >
            Cotizaciones recientes
          </Typography>

          <List>
            {recentQuotes.map((quote, index) => (
              <React.Fragment key={quote.id}>
                <Paper
                  sx={{
                    mb: 2,
                    p: { xs: 1, sm: 2 },
                    borderRadius: { xs: 1, sm: 2 },
                  }}
                >
                  <ListItem alignItems="flex-start" sx={{ px: 0 }}>
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: "grey.300", width: { xs: 40, sm: 56 }, height: { xs: 40, sm: 56 } }}>
                        {quote.type === "Vida" && <HeartIcon />}
                        {quote.type === "Salud" && <PersonIcon />}
                        {quote.type === "Auto" && <CarIcon />}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Typography
                          variant="subtitle1"
                          component="div"
                          sx={{ fontSize: { xs: "1rem", sm: "1.2rem" } }}
                        >
                          Seguro de {quote.type} - {quote.name}
                        </Typography>
                      }
                      secondary={
                        <Box sx={{ mt: 1 }}>
                          <Typography component="span" variant="body2" color="text.primary">
                            {quote.location} • {quote.status}
                            {quote.price && ` • Precio estimado: ${quote.price} / ${quote.period}`}
                            {quote.issue && ` • ${quote.issue}`}
                          </Typography>
                          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                            {quote.time}
                          </Typography>
                        </Box>
                      }
                    />
                    <ListItemSecondaryAction>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <DetailButton variant="outlined" size="small" sx={{ mr: 1 }}>
                          Ver detalles
                        </DetailButton>
                        <IconButton edge="end" aria-label="edit" size="small" sx={{ mr: 1 }}>
                          <Edit />
                        </IconButton>
                        <IconButton
                          edge="end"
                          aria-label="favorite"
                          size="small"
                          onClick={() => toggleFavorite(quote.id)}
                        >
                          {favorites[quote.id] ? <Favorite color="error" /> : <FavoriteBorder />}
                        </IconButton>
                      </Box>
                    </ListItemSecondaryAction>
                  </ListItem>
                </Paper>
                {index < recentQuotes.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        </Box>
      </Container>
    </Box>
  )
}
