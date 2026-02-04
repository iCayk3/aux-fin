import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import StatCard from "../dashboard/components/StatCard"
import HighlightedCard from "../dashboard/components/HighlightedCard"
import SessionsChart from "../dashboard/components/SessionsChart"
import PageViewsBarChart from "../dashboard/components/PageViewsBarChart"
import CustomizedDataGrid from "../dashboard/components/CustomizedDataGrid"
import CustomizedTreeView from "../dashboard/components/CustomizedTreeView"
import ChartUserByCountry from "../dashboard/components/ChartUserByCountry"
import Copyright from "../dashboard/internals/components/Copyright"
import Grid from "@mui/material/Grid"
import Stack from "@mui/material/Stack"
import { useEffect, useState, useMemo } from "react"
import Api from "../../service/Api"

const today = new Date()
const UseApi = Api()

const formatMoney = (value = 0) =>
  Number(value).toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })

const MinhaDash = () => {
  const [dataConsulta, setDataConsulta] = useState(
    today.toISOString().slice(0, 10)
  )

  const [data2, setBoletosBaixados] = useState({
    faturamento: 0,
    nRecebido: 0,
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await UseApi("rbx/faturamento", "POST", {
          data: dataConsulta,
        })

        setBoletosBaixados({
          recebido: Number(response?.recebido ?? 0),
          faturamento: Number(response?.faturamento ?? 0),
          nRecebido: Number(response?.nRecebido ?? 0),
        })
      } catch (error) {
        console.error("Erro ao buscar dados:", error)
        setBoletosBaixados({ faturamento: 0, nRecebido: 0 })
      }
    }

    fetchData()
  }, [dataConsulta])

  const cards = useMemo(
    () => [
      {
        title: "Recebido",
        value: `R$ ${formatMoney(data2.recebido)}`,
        interval: "Last 30 days",
        trend: "up",
        data: [
          200, 24, 220, 260, 240, 380, 100, 240, 280, 240, 300, 340, 320, 360,
          340, 380, 360, 400, 380, 420, 400, 640, 340, 460, 440, 480, 460, 600,
          880, 220,
        ],
      },
      {
        title: "Faltante a receber",
        value: `R$ ${formatMoney(data2.nRecebido)}`,
        interval: "Last 30 days",
        trend: "down",
        data: [
          1640, 1250, 970, 1130, 1050, 900, 720, 1080, 900, 450, 920, 820, 840,
          600, 820, 780, 800, 760, 380, 740, 660, 620, 840, 500, 520, 480, 400,
          360, 300, 220,
        ],
      },
      {
        title: "Faturamento mensal",
        value: `R$ ${formatMoney(data2.faturamento)}`,
        interval: "Last 30 days",
        trend: "neutral",
        data: [
          500, 400, 510, 530, 520, 600, 530, 520, 510, 730, 520, 510, 530, 620,
          510, 530, 520, 410, 530, 520, 610, 530, 520, 610, 530, 420, 510, 430,
          520, 510,
        ],
      },
    ],
    [data2]
  )

  return (
    <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" } }}>
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        Overview
      </Typography>

      <Grid container spacing={2} columns={12} sx={{ mb: 2 }}>
        {cards.map((card, index) => (
          <Grid key={index} size={{ xs: 12, sm: 6, lg: 3 }}>
            <StatCard {...card} />
          </Grid>
        ))}

        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <HighlightedCard />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <SessionsChart />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <PageViewsBarChart />
        </Grid>
      </Grid>

      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        Details
      </Typography>

      <Grid container spacing={2} columns={12}>
        <Grid size={{ xs: 12, lg: 9 }}>
          <CustomizedDataGrid />
        </Grid>

        <Grid size={{ xs: 12, lg: 3 }}>
          <Stack gap={2} direction={{ xs: "column", sm: "row", lg: "column" }}>
            <CustomizedTreeView />
            <ChartUserByCountry />
          </Stack>
        </Grid>
      </Grid>

      <Copyright sx={{ my: 4 }} />
    </Box>
  )
}

export default MinhaDash
