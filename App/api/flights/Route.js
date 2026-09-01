export async function POST(request) {
  try {
    const body = await request.json();

    const { origin, destination, date } = body;

    if (!origin || !destination || !date) {
      return Response.json(
        { error: "Faltan origen, destino o fecha" },
        { status: 400 }
      );
    }

    const token = process.env.DUFFEL_ACCESS_TOKEN;

    if (!token) {
      return Response.json(
        { error: "DUFFEL_ACCESS_TOKEN no está configurado" },
        { status: 500 }
      );
    }

    const response = await fetch(
      "https://api.duffel.com/air/offer_requests?return_offers=true&view=offers",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
          "Duffel-Version": "v2",
        },
        body: JSON.stringify({
          data: {
            slices: [
              {
                origin,
                destination,
                departure_date: date,
              },
            ],
            passengers: [
              {
                type: "adult",
              },
            ],
            cabin_class: "economy",
            max_connections: 2,
          },
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return Response.json(
        {
          error: "Duffel devolvió un error",
          details: data,
        },
        { status: response.status }
      );
    }

    return Response.json(data);
  } catch (error) {
    return Response.json(
      {
        error: "Error interno",
        details: error.message,
      },
      { status: 500 }
    );
  }
}
