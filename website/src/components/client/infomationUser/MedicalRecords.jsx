import { useSelector } from "react-redux";
import { getImageUrl } from "@/utils/helper";
import { formatDateTimeLocale } from "@/utils/format";
import { MedicalRecordAccordion } from "./accordions/MedicalRecordAccordion";
import { User, Phone, CreditCard, Users, MapPin, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/Avatar";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/Table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";

const MedicalRecords = () => {
  const userProfile = useSelector((state) => state.auth.userProfile);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Hồ sơ bệnh án cá nhân</h1>
      <Tabs defaultValue="info" className="w-full">
        <TabsList className='w-full'>
          <TabsTrigger value="info" className='w-full'>Thông tin cơ bản</TabsTrigger>
          <TabsTrigger value="records" className='w-full'>Chi tiết bệnh án</TabsTrigger>
        </TabsList>
        <TabsContent value="info">
          <Card>
            <CardHeader>
              <CardTitle>Thông tin cá nhân</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
                <Avatar className="w-32 h-32">
                  <AvatarImage src={getImageUrl(userProfile?.avatar)} alt={userProfile?.fullName} />
                  <AvatarFallback>{userProfile?.fullName?.charAt(0)}</AvatarFallback>
                </Avatar>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium flex items-center gap-2">
                        <User className="w-4 h-4" />
                        Họ và tên
                      </TableCell>
                      <TableCell>{userProfile?.fullName}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        Ngày sinh
                      </TableCell>
                      <TableCell>{formatDateTimeLocale(userProfile?.dateOfBirth, false)}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium flex items-center gap-2">
                        <Phone className="w-4 h-4" />
                        Số điện thoại
                      </TableCell>
                      <TableCell>{userProfile?.phoneNumber}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium flex items-center gap-2">
                        <CreditCard className="w-4 h-4" />
                        Số CCCD
                      </TableCell>
                      <TableCell>{userProfile?.citizenIdentificationNumber}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        Giới tính
                      </TableCell>
                      <TableCell>{userProfile?.gender || "Chưa rõ"}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        Địa chỉ
                      </TableCell>
                      <TableCell>{userProfile?.address}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="records">
          <Card>
            <CardHeader>
              <CardTitle>Chi tiết bệnh án</CardTitle>
            </CardHeader>
            <CardContent>
              <MedicalRecordAccordion />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MedicalRecords;

