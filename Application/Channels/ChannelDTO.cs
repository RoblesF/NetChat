using System;
using System.Collections.Generic;
using Application.Messages;

namespace Application.Channels
{
    public class ChannelDTO
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public virtual ICollection<MessageDTO> Messages { get; set; }
    }
}