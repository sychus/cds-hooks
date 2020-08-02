import moment from 'moment';

// La definición
export const definition = {
    hook: 'patient-view',
    name: 'CDS Service Starter Patient View',
    description: 'Este es un servicio de ejemplo que se dispara cuando vemos un paciente',
    id: 'idDelHookPatientView',
    prefetch: {
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
                detail: 'Evolución del crecimiento del paciente',
                indicator: 'critical',
                links: [{
                    label: 'Dashboard de crecimiento',
                    url: 'https://prairiebyte.secure.omnis.com/fhir/smart/app1oauth/index.php?code=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjb250ZXh0Ijp7Im5lZWRfcGF0aWVudF9iYW5uZXIiOnRydWUsInNtYXJ0X3N0eWxlX3VybCI6Imh0dHBzOi8vbGF1bmNoLnNtYXJ0aGVhbHRoaXQub3JnL3NtYXJ0LXN0eWxlLmpzb24iLCJwYXRpZW50Ijoic21hcnQtNzc3NzcwMyJ9LCJjbGllbnRfaWQiOiIyY2IwN2JlMC1kOGM3LTQxMWEtOGExZi03YjA4MTBmY2NjNDciLCJzY29wZSI6ImxhdW5jaC9wYXRpZW50IiwiaWF0IjoxNTk2MzMzNzg1LCJleHAiOjE1OTYzMzQwODV9.G4ignqTXZq7n-t_wdcvxV2eJxR0OaXsaKDGvoibBlCE&state=843591915',
                    type: 'smart'
                }]
            }
        ],
    };
    res.json(cards);
};