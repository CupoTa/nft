'use client'

import { useRef, useState } from 'react'
import { useFormik } from "formik"
import axios from "axios";
import {
    AspectRatio,
    Box,
    Button,
    Image,
    Flex,
    FormControl,
    FormLabel,
    Input,
    VStack,
    useToast
} from "@chakra-ui/react";


export function FileUpdate() {

    const fileInputRef = useRef(null);
    const toast = useToast()
    const [imageCID, setImageCID] = useState('')

    const formik = useFormik({

        initialValues: {
            file: imageCID
        },
        onSubmit: (values) => {
            console.log(imageCID)
            setImageCID('')
            // alert(JSON.stringify(values, null, 2));
        }
    });

    const fileUpload = async (e: any) => {
        const file = e.target.files[0];
        if (!file) return
        try {
            const formData = new FormData();
            formData.append("file", file)

            const pinData = JSON.stringify({
                name: file?.name
            })
            formData.append('pinataMetadata', pinData)

            const res = await axios("https://api.pinata.cloud/pinning/pinFileToIPFS", {
                method: 'POST',
                data: formData as any,
                headers: {
                    'Authorization': `Bearer ${process.env.NEXT_PUBLIC_PINATA_JWT}`
                },
                
            })
            const resData = await res.data
            // if (!resData.ok) throw new Error(await res.text())
            console.log("File uploaded, CID:", resData.IpfsHash)
            setImageCID(resData.IpfsHash)
            toast({
                position: "bottom-right",
                status: "success",
                variant: 'left-accent',
                isClosable: true,
                title: "INFO",
                description: "File upload",
            })
        } catch (error) {
            console.log('Error uploading file: ', error);
            // setLoading(false);
            // setOpen(false);
            toast({
                position: "bottom-right",
                status: "error",
                variant: 'left-accent',
                isClosable: true,
                title: "ERROR",
                description: "File not upload"
            })
        }
    }

    return (
        <Flex bg="gray.100" align="center" justify="center" h="100vh">
            <Box bg="white" p={6} rounded="md">
                <form onSubmit={formik.handleSubmit}>
                    {imageCID != '' &&
                        <AspectRatio maxW='400px' ratio={4 / 3}>
                            <Image src={`${process.env.NEXT_PUBLIC_IPFS_PATH}${imageCID}`} alt='naruto' objectFit='cover' />
                        </AspectRatio>
                    }
                    <VStack spacing={4} align="flex-start">
                        <FormControl>
                            <FormLabel htmlFor="file">Image File</FormLabel>
                            <Input
                                disabled={Boolean(imageCID)}
                                id="file"
                                type="file"
                                name="file"
                                variant="filled"
                                accept="image/*"
                                ref={fileInputRef}
                                onChange={fileUpload}
                                required
                                sx={{
                                    "::file-selector-button": {
                                        height: 35,
                                        padding: 0,
                                        mr: 4,
                                        background: "none",
                                        border: "none",
                                        fontWeight: "bold",
                                    },
                                }}
                            />
                        </FormControl>
                        {/* <FormControl>
                            <FormLabel htmlFor="password">Password</FormLabel>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                variant="filled"
                                onChange={formik.handleChange}
                                value={formik.values.password}
                            />
                        </FormControl>
                        <Checkbox
                            id="rememberMe"
                            name="rememberMe"
                            onChange={formik.handleChange}
                            isChecked={formik.values.rememberMe}
                            colorScheme="purple"
                        >
                            Remember me?
                        </Checkbox> */}
                        <Button type="submit" colorScheme="purple" width="full">
                            Mint NFT
                        </Button>
                    </VStack>
                </form>
            </Box>
        </Flex>
    );
}