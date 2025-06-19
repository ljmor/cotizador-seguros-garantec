"use client"

import React, { useState, useEffect } from "react"
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
  CircularProgress,
} from "@mui/material"
import { Favorite, FavoriteBorder, Edit, Add } from "@mui/icons-material"
import { styled } from "@mui/material/styles"
import { motion } from "framer-motion"

// Iconos personalizados para los tipos de seguro (más legibles)
const HeartIcon = ({ size = 40 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#1A1A1A" strokeWidth="2.5">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
)

const PersonIcon = ({ size = 40 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#1A1A1A" strokeWidth="2.5">
    <path d="M12 2a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5zm0 13c5.523 0 10 2.238 10 5v2H2v-2c0-2.762 4.477-5 10-5z" />
    <path d="M12 8v4M10 10h4" />
  </svg>
)

const CarIcon = ({ size = 40 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#1A1A1A" strokeWidth="2.5">
    <path d="M16 6l3 4h2a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-1a3 3 0 0 1-3 3 3 3 0 0 1-3-3H9a3 3 0 0 1-3 3 3 3 0 0 1-3-3H2a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h2l3-4h9z" />
    <circle cx="7" cy="16" r="1.5" />
    <circle cx="17" cy="16" r="1.5" />
  </svg>
)

// Componentes estilizados
const StyledSidebar = styled(Box)(({ theme }) => ({
  background: "linear-gradient(180deg, #1E3A8A 0%, #3B82F6 100%)",
  color: "white",
  height: "100vh",
  width: 80,
  position: "fixed",
  left: 0,
  top: 0,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: theme.spacing(3, 0),
  zIndex: 1200,
  boxShadow: "2px 0 8px rgba(0,0,0,0.15)",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "row",
    width: "100%",
    height: 64,
    position: "fixed",
    bottom: 0,
    top: "auto",
    justifyContent: "space-around",
    boxShadow: "0 -2px 8px rgba(0,0,0,0.1)",
  },
}))

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  color: "white",
  margin: theme.spacing(2, 0),
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "scale(1.15)",
    backgroundColor: "rgba(255,255,255,0.1)",
  },
  [theme.breakpoints.down("sm")]: {
    margin: theme.spacing(0, 1),
    padding: 8,
  },
}))

const StyledLabel = styled(Typography)(({ theme }) => ({
  fontSize: "0.85rem",
  fontWeight: 500,
  marginTop: theme.spacing(0.5),
  fontFamily: '"Inter", sans-serif',
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.7rem",
  },
}))

const InsuranceTypeIcon = styled(Avatar)(({ theme }) => ({
  backgroundColor: "#FCD34D",
  color: "#1A1A1A",
  width: 90,
  height: 90,
  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  "& svg": {
    width: 50,
    height: 50,
  },
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "scale(1.1) rotate(5deg)",
    boxShadow: "0 6px 16px rgba(0,0,0,0.2)",
  },
  [theme.breakpoints.down("sm")]: {
    width: 60,
    height: 60,
    "& svg": {
      width: 30,
      height: 30,
    },
  },
}))

const HeroSection = styled(Paper)(({ theme }) => ({
  background: "#6366F1",
  color: "white",
  padding: theme.spacing(5),
  borderRadius: 20,
  marginBottom: theme.spacing(4),
  boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(3),
    borderRadius: 12,
  },
}))

const StyledTab = styled(Tab)(({ theme }) => ({
  borderRadius: "30px",
  margin: theme.spacing(0, 1),
  textTransform: "none",
  fontWeight: 600,
  fontFamily: '"Inter", sans-serif',
  color: "#1E3A8A",
  "&.Mui-selected": {
    backgroundColor: "#3B82F6",
    color: "white",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },
  transition: "all 0.3s ease",
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.85rem",
    padding: theme.spacing(1, 2),
  },
}))

const StyledTabs = styled(Tabs)(({ theme }) => ({
  "& .MuiTabs-indicator": {
    display: "none",
  },
  marginBottom: theme.spacing(4),
  backgroundColor: "#F9FAFB",
  borderRadius: "16px",
  padding: theme.spacing(1),
  boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(0.5),
  },
}))

const DetailButton = styled(Button)(({ theme }) => ({
  borderRadius: "30px",
  textTransform: "none",
  borderColor: "#3B82F6",
  color: "#3B82F6",
  fontWeight: 600,
  fontFamily: '"Inter", sans-serif',
  padding: theme.spacing(1, 3),
  transition: "all 0.3s ease",
  "&:hover": {
    backgroundColor: "#3B82F6",
    color: "white",
    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.8rem",
    padding: theme.spacing(0.75, 2),
  },
}))

const QuoteCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: 12,
  backgroundColor: "white",
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
  },
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(1.5),
  },
}))

export const Landing = () => {
  const [tabValue, setTabValue] = useState(0)
  const [favorites, setFavorites] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000) // Simular carga
  }, [])

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
    <Box sx={{ display: "flex", bgcolor: "#F9FAFB", minHeight: "100vh" }}>
      {/* Sidebar */}
      <StyledSidebar role="navigation" aria-label="Navegación principal">
        {["Cotizar", "Historial", "Perfil"].map((label, index) => (
          <StyledIconButton
            key={index}
            aria-label={label}
            component={motion.div}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.95 }}
          >
            <Add fontSize="medium" />
            <StyledLabel>{label}</StyledLabel>
          </StyledIconButton>
        ))}
      </StyledSidebar>

      {/* Contenido Principal */}
      <Container
        maxWidth="lg"
        sx={{
          ml: { xs: 0, sm: "80px" },
          pt: { xs: 3, sm: 5 },
          pb: { xs: 10, sm: 5 },
        }}
      >
        {/* Sección de Héroe */}
        <HeroSection
          elevation={0}
          component={motion.div}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Grid container spacing={3} alignItems="center" justifyContent="space-between">
            <Grid item xs={12} md={6}>
              <Typography
                variant="h3"
                component="h1"
                fontWeight={700}
                fontFamily="'Inter', sans-serif"
                sx={{
                  fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
                  mb: 2,
                  lineHeight: 1.2,
                }}
              >
                Inicia tu Cotización
              </Typography>
              <Typography
                variant="subtitle1"
                sx={{
                  fontSize: { xs: "1rem", sm: "1.25rem" },
                  color: "rgba(255,255,255,0.9)",
                  maxWidth: "90%",
                  overflowWrap: "break-word",
                }}
              >
                Selecciona el tipo de seguro que necesitas en pocos pasos
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Grid container spacing={3} justifyContent="center">
                {[
                  { type: "Vida", icon: <HeartIcon size={50} /> },
                  { type: "Salud", icon: <PersonIcon size={50} /> },
                  { type: "Auto", icon: <CarIcon size={50} /> },
                ].map((item, index) => (
                  <Grid item xs={4} key={index} sx={{ textAlign: "center", minWidth: 100 }}>
                    <InsuranceTypeIcon
                      component={motion.div}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label={`Seguro de ${item.type}`}
                    >
                      {item.icon}
                    </InsuranceTypeIcon>
                    <Typography
                      variant="body1"
                      sx={{
                        mt: 1.5,
                        fontFamily: "'Inter', sans-serif",
                        fontSize: { xs: "0.9rem", sm: "1rem" },
                        fontWeight: 500,
                      }}
                    >
                      {item.type}
                    </Typography>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </HeroSection>

        {/* Pestañas */}
        <StyledTabs
          value={tabValue}
          onChange={handleTabChange}
          aria-label="Pestañas de navegación"
          variant="scrollable"
          scrollButtons="auto"
          component={motion.div}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <StyledTab label="Cotizaciones" aria-label="Ver cotizaciones" />
          <StyledTab label="Contactos" aria-label="Ver contactos" />
        </StyledTabs>

        {/* Cotizaciones Recientes */}
        <Box sx={{ mt: 4 }}>
          <Typography
            variant="h5"
            component="h2"
            fontWeight={700}
            fontFamily="'Inter', sans-serif"
            sx={{
              fontSize: { xs: "1.5rem", sm: "1.75rem", md: "2rem" },
              position: "sticky",
              top: 0,
              bgcolor: "#F9FAFB",
              zIndex: 1000,
              py: 2,
            }}
          >
            Cotizaciones Recientes
          </Typography>

          {loading ? (
            <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
              <CircularProgress color="primary" />
            </Box>
          ) : (
            <List>
              {recentQuotes.map((quote, index) => (
                <React.Fragment key={quote.id}>
                  <QuoteCard
                    component={motion.div}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <ListItem alignItems="flex-start" sx={{ px: 0, py: 1 }}>
                      <ListItemAvatar>
                        <Avatar
                          sx={{
                            bgcolor: "#E5E7EB",
                            width: { xs: 48, sm: 60 },
                            height: { xs: 48, sm: 60 },
                          }}
                        >
                          {quote.type === "Vida" && <HeartIcon size={30} />}
                          {quote.type === "Salud" && <PersonIcon size={30} />}
                          {quote.type === "Auto" && <CarIcon size={30} />}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Typography
                            variant="subtitle1"
                            fontFamily="'Inter', sans-serif"
                            fontWeight={600}
                            sx={{
                              fontSize: { xs: "1rem", sm: "1.2rem" },
                              overflowWrap: "break-word",
                            }}
                          >
                            Seguro de {quote.type} - {quote.name}
                          </Typography>
                        }
                        secondary={
                          <Box sx={{ mt: 1, minWidth: 0 }}>
                            <Typography
                              component="span"
                              variant="body2"
                              color="text.primary"
                              sx={{
                                fontFamily: "'Inter', sans-serif",
                                overflowWrap: "break-word",
                                display: "block",
                              }}
                            >
                              {quote.location} • {quote.status}
                              {quote.price && ` • Precio: ${quote.price}/${quote.period}`}
                              {quote.issue && ` • ${quote.issue}`}
                            </Typography>
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              sx={{ mt: 0.5, fontFamily: "'Inter', sans-serif" }}
                            >
                              {quote.time}
                            </Typography>
                          </Box>
                        }
                      />
                      <ListItemSecondaryAction sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <DetailButton
                          variant="outlined"
                          size="small"
                          aria-label="Ver detalles"
                          component={motion.button}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Ver detalles
                        </DetailButton>
                        <IconButton
                          edge="end"
                          aria-label="Editar cotización"
                          size="small"
                          component={motion.button}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Edit />
                        </IconButton>
                        <IconButton
                          edge="end"
                          aria-label={favorites[quote.id] ? "Quitar de favoritos" : "Añadir a favoritos"}
                          size="small"
                          onClick={() => toggleFavorite(quote.id)}
                          component={motion.button}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          {favorites[quote.id] ? <Favorite color="error" /> : <FavoriteBorder />}
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  </QuoteCard>
                  {index < recentQuotes.length - 1 && <Divider sx={{ my: 1 }} />}
                </React.Fragment>
              ))}
            </List>
          )}
        </Box>
      </Container>
    </Box>
  )
}