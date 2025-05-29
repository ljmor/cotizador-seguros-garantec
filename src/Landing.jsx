import React, { useState } from "react"
import { LuHeartHandshake } from "react-icons/lu";
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
  Icon,
} from "@mui/material"
import { Favorite, FavoriteBorder, Edit, Add, Check } from "@mui/icons-material"
import { styled } from "@mui/material/styles"
import { FaCar, FaHandHoldingHeart, FaRibbon, FaStethoscope } from "react-icons/fa";
import { FaUserDoctor } from "react-icons/fa6";
import { BsHeartPulse } from "react-icons/bs";

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
      name: "Juan G.",
      location: "Loja",
      status: "Aguardando confirmación",
      price: "$25.99",
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
        <HeroSection elevation={0}>
          <Grid container spacing={4} justifyContent="space-between" sx={{ minHeight: "200px" }}>
            {/* Texto alineado abajo a la izquierda (centrado en xs) */}
            <Grid
              item
              xs={12}
              md={6}
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: { xs: "center", md: "flex-end" }, // Centra el bloque verticalmente en xs
                alignItems: { xs: "center", md: "flex-start" },   // Centra el bloque horizontalmente en xs
              }}
            >
              <Box
                sx={{
                  textAlign: { xs: "center", md: "left" }, // Centra el texto interno en xs
                  p: { xs: 2, md: 0 }, // Agrega un poco de padding en xs si el fondo blanco se ve muy ajustado
                }}
              >
                <Typography
                  variant="h4"
                  component="h1"
                  fontWeight="bold"
                  gutterBottom
                  mb={-1}
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
              <Grid container spacing={{ xs: 2, md: 4 }} justifyContent="center">
                {/* Icono Vida */}
                <Grid item xs={4} sx={{ textAlign: "center" }}>
                  <Typography
                    variant="body1"
                    sx={{
                      mb: 1,
                      fontSize: { xs: '20px', sm: '24px', md: '26px' }, // Ajustado para '24px' en md sería '1.5rem' si base es 16px. Uso 1.25rem como ejemplo.
                      fontWeight: 'bold',
                    }}
                  >
                    Vida
                  </Typography>
                  <Box
                    sx={{
                      backgroundColor: "white",
                      width: { xs: "70px", sm: "90px", md: "115px" },    // Icono más pequeño en xs y sm
                      height: { xs: "70px", sm: "90px", md: "115px" },   // Icono más pequeño en xs y sm
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mx: "auto", // Asegura que el Box se centre en su celda
                      boxShadow: '0px 4px 12px rgba(0,0,0,0.1)', // Ejemplo de sombra suave
                    }}
                  >
                    <FaHandHoldingHeart
                      color="#fcd19c"
                      // El tamaño del icono se controla con fontSize vía sx
                      style={{ display: 'block' }} // Ayuda a evitar espacio extra debajo del svg en algunos casos
                      sx={{ fontSize: { xs: "28px", sm: "35px", md: "45px" } }}
                    />
                  </Box>
                </Grid>
                {/* Icono Salud */}
                <Grid item xs={4} sx={{ textAlign: "center" }}>
                  <Typography
                    variant="body1"
                    sx={{
                      mb: 1,
                      fontSize: { xs: '20px', sm: '24px', md: '26px' },
                      fontWeight: 'bold',
                    }}
                  >
                    Salud
                  </Typography>
                  <Box
                    sx={{
                      backgroundColor: "white",
                      width: { xs: "70px", sm: "90px", md: "115px" },
                      height: { xs: "70px", sm: "90px", md: "115px" },
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mx: "auto",
                      boxShadow: '0px 4px 12px rgba(0,0,0,0.1)',
                    }}
                  >
                    <FaStethoscope
                      color="black"
                      style={{ display: 'block' }}
                      sx={{ fontSize: { xs: "28px", sm: "35px", md: "45px" } }}
                    />
                  </Box>
                </Grid>
                {/* Icono Auto */}
                <Grid item xs={4} sx={{ textAlign: "center" }}>
                  <Typography
                    variant="body1"
                    sx={{
                      mb: 1,
                      fontSize: { xs: '20px', sm: '24px', md: '26px' },
                      fontWeight: 'bold',
                    }}
                  >
                    Auto
                  </Typography>
                  <Box
                    sx={{
                      backgroundColor: "white",
                      width: { xs: "70px", sm: "90px", md: "115px" },
                      height: { xs: "70px", sm: "90px", md: "115px" },
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mx: "auto",
                      boxShadow: '0px 4px 12px rgba(0,0,0,0.1)',
                    }}
                  >
                    <FaCar
                      color="black"
                      style={{ display: 'block' }}
                      sx={{ fontSize: { xs: "28px", sm: "35px", md: "45px" } }}
                    />
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </HeroSection>


        {/* Tabs */}
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <StyledTabs value={tabValue} onChange={handleTabChange} aria-label="navigation tabs" variant="fullWidth">
            <StyledTab sx={{ borderRadius: 3, textTransform: 'capitalize' }} label="Cotizaciones incompletas" iconPosition="start" />
            <StyledTab sx={{ borderRadius: 3, textTransform: 'capitalize' }} label="Cotizaciones completas" />
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
                        {quote.type === "Vida"}
                        {quote.type === "Salud"}
                        {quote.type === "Auto"}
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
