#generate hash files
generate_hash <- function (pathway_filepath, pairwise_filepath) {
  dyn.load("/home/awright/git/libnet/r_package/libnetR/src/generate_hash.so")
  .Call("generate_hash_files", pathway_filepath, pairwise_filepath) 
}