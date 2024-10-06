import { db } from '@/lib/bd';
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

export default async function CompanyIdPage({params}: {params:{companyId: string}}) {
    const { userId } = auth();

    if(!userId) {
        return redirect("/")
    }

    const company = await db.company.findUnique({
        where: {
            id: params.companyId,
            userId
        }
    }) // Vamos a pedir un solo resultado
    if(!company) {
        return redirect("/")
    }

    return (
        <div>
            <p>header</p>
            <p>Company informatios</p>
            <p>Company footer</p>
        </div>
    )
}