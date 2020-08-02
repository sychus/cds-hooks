import moment from 'moment';

// La definición de mi servicio: Es expuesto para que pueda ser utilizado
export const definition = {
    hook: 'patient-view',
    name: 'CDS para Patient-View',
    description: 'Este es un servicio de ejemplo que se dispara cuando vemos un paciente',
    id: 'idDelHookPatientView',
    prefetch: {
        // Contexto
        patient: 'Patient/{{context.patientId}}',
    },
};

// El handler
export const handler = (req, res) => {
    // El contexto necesario para poder hacer algo.... en este caso el contexto es el paciente
    const patient = req.body.prefetch.patient;
    // Este hook se dispara cuando estamos viendo el paciente (patient-view)
    const text = `Esto es un ejemplo de CDS. Hook: 'patient-view' -- Paciente: ${patient.name[0].family} ${patient.name[0].given}`;
    // TODO el codigo que yo quieraaaa
    const cards = {
        cards: [
            {
                summary: `Summary: ${text}`,
                detail: `Este paciente lo debería haber visto hace: ${moment().subtract(1, 'months').format()}`,
                source: {
                    label: 'Sugiere guia de riesgo cardiovascular',
                    url: 'https://secardiologia.es/cientifico/guias-clinicas/prevencion-riesgo-cardiovascular',
                },
                indicator: 'warning',
                links: [
                    {
                        label: 'Usar una aplicación SMART con ANDES',
                        url: 'https://engineering.cerner.com/ascvd-risk-calculator/',
                        type: 'smart'
                    }
                ]
            },
            {
                summary: `Summary: ${text}`,
                detail: 'Resultados del electrocardiograma',
                indicator: 'critical',
                links: [{
                    label: 'Electro e informe de resultados',
                    url: 'https://chestpain-sandbox.regenstrief.org/iuh/secure/jsp?patientId=smart-4444001',
                    type: 'smart'
                }]
            }
        ],
    };
    res.json(cards);
};