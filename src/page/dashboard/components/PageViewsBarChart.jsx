import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { BarChart } from '@mui/x-charts/BarChart';
import { useTheme } from '@mui/material/styles';

export default function PageViewsBarChart() {
  const theme = useTheme();
  const colorPalette = [
    (theme.vars || theme).palette.primary.dark,
    (theme.vars || theme).palette.primary.main,
    (theme.vars || theme).palette.primary.light,
  ];

  return (
    <Card variant="outlined" sx={{ width: '100%' }}>
      <CardContent>
        <Typography component="h2" variant="subtitle2" gutterBottom>
          Fluxo de cobrança
        </Typography>
        <Stack sx={{ justifyContent: 'space-between' }}>
          <Stack
            direction="row"
            sx={{
              alignContent: { xs: 'center', sm: 'flex-start' },
              alignItems: 'center',
              gap: 1,
            }}
          >
            <Typography variant="h4" component="p">
              R$ 3.299,56
            </Typography>
            <Chip size="small" color="success" label="+8%" />
          </Stack>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            Debito regularizado
          </Typography>
        </Stack>
        <BarChart
          borderRadius={8}
          colors={colorPalette}
          xAxis={[
            {
              scaleType: 'band',
              categoryGapRatio: 0.5,
              data: ['Cob. Interna', 'Cob. agendada', 'Neg. Debitos', 'N. Localizado', 'Ret. Inadiplencia', 'Retirada', 'Deb. Regulizado'],
              height: 24,
            },
          ]}
          yAxis={[{ width: 50 }]}
          series={[
            {
              id: 'page-views',
              label: 'Faturamento',
              data: [56, 33, 16, 3, 2, 1, 44],
              stack: 'A',
            },
            // {
            //   id: 'downloads',
            //   label: 'Recebidos',
            //   data: [358657.98, 388657.14, 218657.15, 418657.15, 418657.15, 428657.15, 488657.15],
            //   stack: 'A',
            // },
            // {
            //   id: 'conversions',
            //   label: 'A receber',
            //   data: [4051, 2275, 3129, 4693, 3904, 2038, 2275],
            //   stack: 'A',
            // },
          ]}
          height={250}
          margin={{ left: 0, right: 0, top: 20, bottom: 0 }}
          grid={{ horizontal: true }}
          hideLegend
        />
      </CardContent>
    </Card>
  );
}
