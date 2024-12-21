import { handleError } from "@/helpers/handleError";
import dbConnect from "@/lib/dbConnect";
import UrlModel from "@/models/Url";


export async function DELETE(
    request: Request,
    { params }: { params: { urlId: string } }
) {
    await dbConnect();

    const urlID = params.urlId;

    try {

        if (!urlID) {
            return handleError("Please provide url id to delete this short url", 400);
        }

        const user = await UrlModel.findOne({ urlId: urlID });

        if (!user) {
            return handleError("Short Url not found", 404);
        }

        await UrlModel.deleteOne({ urlId: urlID });

        return Response.json(
            {
                success: true,
                message: 'Short Url deleted successfully.'
            },
            {
                status: 200
            }
        )

    } catch (error: any) {
        console.error("Error deleting short url:", error);
        return handleError(error.message, 500);
    }
}
