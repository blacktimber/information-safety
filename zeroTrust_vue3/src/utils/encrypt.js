import JSEncrypt from 'jsencrypt'

// 公钥
const publicKey = `MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAKwlxCzBq92pv4gkBjocxEjN+MKd1+5a0f5MZo+CvS8zAVQcoSG7tBY7ImhV4jmYUbLaV21B2kdMP63y3DFS2SMCAwEAAQ==`
const privateKey = `MIICdwIBADANBgkqhkiG9w0BAQEFAASCAmEwggJdAgEAAoGBAKmmsyLefYov85CTybtob+/ZQU6bmaEKxIT7s3ywBre2jesin2izVzHBAWlKLBOLjHr1YYJWK1rerUOoSb8pV0DlpteX3Z2VLhSw64xLouPhYl7CtSDBNBOuDn+Le8xaO3U4A1zo3/ABrn+HzJtRcZjvYfyRAvfM3kQLEQftW7MFAgMBAAECgYEAgRRc6ALw8dtaLn7D1tu3j351uiGZ2nYe4C/CePRVqCI2CNnm//q0NR7su/e7YYOj90oMTubRRep3WisJMXF6+J/LrcCVfnGTrLEi7CJVITEe383WfjahWJN++XQCMQeOIc3ZEbxjvnHVUwVsJOK97ZLORQwWPjHzvEMbkc47QWECQQDgHRbktwzo2TLbBTQbB+RACXTFfQoi1/hVt85/+p+pY0YbVwtXCtI3UZ+r8Lug7ibiuU1ZGnDHWltdwAM22Dd7AkEAwcnrWfegCexSjX4JTiEpaMAKVFdINPjXLqc1MsqgQfSEO7Vlyjykw7sb7sGTd1PCds9AZRH/hmNuKoEBiop3fwJAKlCTv/9n6pcH6R6kZe4phIXEjH09arLIarbXwIY7mynpVMQsmfSrGFLLCRXc91e/89L07bv2S02eLqdQdAyC/QJANr0ijbc0rZjjeLQxTLBxUfVs9YXyD4R6w+LXVBGIUxkOgQ8sQYP/xooDyd1EGmC+fXDtb5813nAXnknydX/HYQJBALjIuC4lHcwe9WozZotQ8j0y1Cki+Oifqyx28K2kri3oe19H43Fgo2oqmx07hyyl62FQdI62qLrW5GFHg8EWEaM=`
export default {
    // 加密
    encrypt(password) {
        const encryptor = new JSEncrypt()
        encryptor.setPublicKey(publicKey) // 设置公钥
        return encryptor.encrypt(password) // 对数据进行加密
    },

    decrypt(password) {
        const encryptor = new JSEncrypt()
        encryptor.setPrivateKey(privateKey)
        return encryptor.decrypt(password)
    }
}
